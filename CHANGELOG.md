# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-05-06

> **Major release.** This version introduces React Server Components (RSC) support and replaces the i18n runtime. Read the migration guide at the bottom of this entry before upgrading.

### Added

- **RSC-compatible `<T>` runtime.** New `T` server component, `t()` server function, and `getServerDict` / `setServerDict` / `loadServerDict` / `loadServerDicts` helpers exposed under `@juki-team/base-ui/server-components`. Server tree reads translations from a per-request `React.cache()`; client tree reads from `I18nContext`.
- **`<I18nProvider>` and hooks** (`useT`, `useI18n`, `useDict`, `useLocale`) — client-side primitives that replace the old `useI18nStore` zustand store.
- **`<JukiI18nBridge dicts={...} fallbackLocale? refreshOnLocaleChange?>`** — bridges the user store's `settings.LANGUAGE` to `<I18nProvider>` and triggers `router.refresh()` when the locale changes (so Server Components re-render with the new dict). Skips the initial render to avoid an unnecessary refresh on mount.
- **`react-server` conditional export.** `import { X } from '@juki-team/base-ui'` now resolves to a server-safe build (`dist/esm/server.js`) when imported from a Server Component, and to the client build (`dist/esm/main.js`) otherwise. Consumers don't need to change the import path between contexts for the components that exist in both bundles.
- **`'use client'` directive at the package's main entry** — `dist/esm/main.js` is now correctly marked as a client boundary so Next.js doesn't process it (and its `swr` import) under the `react-server` condition.
- **`sideEffects` field in `package.json`** — JS modules are now tree-shakeable; CSS/SCSS files keep their side-effect status.
- **New server-safe components**: `CircularProgress`, `NewlineInfo`, `ProblemStatus`, `Image`, `ThemeColorPalette`, `DateLiteral`, `TextHeadCell`, `SubmissionMemory`, `SubmissionTime` — all relocated under `*/server/` folders and exposed via `@juki-team/base-ui/server-components`.

### Changed

- **`useJukiUserSettings().setSettings(...)`** now always calls `updateUserPreferences` regardless of `isLogged`. Anonymous users persist preferences via the same API endpoint as authenticated users (backend must accept anonymous updates).
- **Locale strings are uppercase** project-wide (`Language.EN === 'EN'`, `Language.ES === 'ES'`). Dict keys, `setServerDict(locale, ...)`, and the `dicts` prop of `<I18nProvider>` / `<JukiI18nBridge>` must all use the `Language` enum values.
- **Build pipeline (`rollup.config.js`):**
  - Added `rollup-preserve-directives` plugin (after `terser`) so `'use client'` banners survive minification.
  - Disabled terser's `compress.directives` so non-standard directives (`'use client'`) are not stripped.
  - Removed the `MODULE_LEVEL_DIRECTIVE` warning suppression; we want to see those if anything regresses.
  - Added `output.banner` that injects `"use client";` at the top of `dist/esm/main.js` regardless of tree-shaking.

### Deprecated

- **`<JukiI18nInitializer />`** — kept exported as a no-op for backwards compatibility, but it does nothing now. Dictionaries are loaded by the consumer's layout via `loadServerDicts(...)`. Remove it from your JSX in a follow-up PR.

### Removed

- **BREAKING: `useI18nStore`** — the zustand store and its module (`src/stores/i18n/`) were deleted. Replace `useI18nStore((s) => s.i18n.t)` with `useT()`. Replace `useI18nStore((s) => s.changeLanguage)` with `useJukiUserSettings().setSettings([{ key: ProfileSetting.LANGUAGE, value: ... }])` (the new flow propagates through the user store; `JukiI18nBridge` reacts).
- **BREAKING: `localStorage` fallback for user settings.** `JukiUserProvider` no longer reads `LANGUAGE` or `THEME` from `localStorage` for anonymous users. The backend's `auth.ping` response is the single source of truth — it must return `data.content.user.settings` populated for both authenticated and anonymous users.
- **BREAKING: server-safe components are no longer in the main client barrel.** The following components were removed from `@juki-team/base-ui` (root) and now live exclusively under `@juki-team/base-ui/server-components`:
  - `CircularProgress`, `NewlineInfo`, `ProblemStatus`, `ThemeColorPalette`, `DateLiteral`, `TextHeadCell`, `SubmissionMemory`, `SubmissionTime`
  - When used **in a Server Component**: keep `import { ... } from '@juki-team/base-ui'` — the conditional export resolves correctly.
  - When used **in a Client Component**: change the import to `import { ... } from '@juki-team/base-ui/server-components'`.
- **BREAKING: `i18next` removed from runtime dependencies.** If your app imports `i18next` directly (not transitively), declare it as your own dependency.

### Fixed

- **RSC build error.** Consumers using Next.js App Router were failing `next build` with `Export default doesn't exist in target module .../swr/dist/index/react-server.mjs [app-rsc]`. Root cause: the published `main.js` was not marked `'use client'`, so Next processed the package under the `react-server` compilation context and resolved `swr` to its server-shim entry, which lacks the runtime exports. Fixed by adding the directive at the entry, preserving it through bundling, and adding the `react-server` conditional export.

---

## Migration guide — 1.4.x → 2.0.0

### 0. Pre-flight: backend coordination

The frontend no longer falls back to `localStorage` or cookies for user settings. Before merging the consumer-side upgrade, confirm with backend:

- `GET /auth/ping` returns a complete `data.content.user.settings` object (with `LANGUAGE`, `THEME`, `DATA_VIEW_MODE`, `MENU_VIEW_MODE`, `NEWSLETTER_SUBSCRIPTION`, `TIME_ZONE`, `FONT_SIZE`) for **both** authenticated and anonymous users.
- `PUT /user/user-key/:userKey/preferences` accepts updates from anonymous users (typically by associating the change with their session cookie server-side).

If those aren't supported yet, anonymous users will see inconsistent defaults and language switches won't persist.

### 1. Update your root layout

```tsx
// app/layout.tsx
import { UserStoreProvider, JukiI18nBridge } from '@juki-team/base-ui';
import { jukiApiManager } from '@juki-team/base-ui/settings';
import { EMPTY_ORGANIZATION as EMPTY_COMPANY, EMPTY_USER } from '@juki-team/base-ui/constants';
import { loadServerDicts, setServerDict } from '@juki-team/base-ui/server-components';
import { Language, ProfileSetting } from '@juki-team/commons/enums';
import type { ReactNode } from 'react';
import type { PingResponseDTO } from '@juki-team/commons/dto';
import type { ContentResponse } from '@juki-team/commons/types';
import { get } from 'helpers';
import { RootLayout } from './RootLayout';

export const dynamic = 'force-dynamic';

const getInitialUser = async () => {
  const session = await get<ContentResponse<PingResponseDTO>>(
    jukiApiManager.apiV2.auth.ping().url,
  );
  return {
    user: session?.success ? session.content.user : EMPTY_USER,
    company: session?.success ? session.content.company : EMPTY_COMPANY,
    isLoading: false,
  };
};

export default async function Layout({ children }: { children: ReactNode }) {
  const initialUser = await getInitialUser();
  const locale = initialUser.user.settings?.[ProfileSetting.LANGUAGE] ?? Language.EN;
  const dicts = await loadServerDicts([Language.EN, Language.ES]);
  setServerDict(locale, dicts[locale] ?? {});

  return (
    <UserStoreProvider initialUser={initialUser}>
      <JukiI18nBridge dicts={dicts}>
        <RootLayout>{children}</RootLayout>
      </JukiI18nBridge>
    </UserStoreProvider>
  );
}
```

Remove `<JukiI18nInitializer />` from anywhere it appears — it's now a no-op and the dicts are loaded by the layout.

### 2. Replace `useI18nStore` callsites

```diff
- import { useI18nStore } from '@juki-team/base-ui';
+ import { useT } from '@juki-team/base-ui';

- const t = useI18nStore((s) => s.i18n.t);
+ const t = useT();
```

Find all callsites:

```bash
grep -rE "useI18nStore" src/
```

### 3. Update language switcher

```diff
'use client';
- import { useRouter } from 'next/navigation';
  import { useJukiUserSettings } from '@juki-team/base-ui';
  import { ProfileSetting, Language } from '@juki-team/commons/enums';

  export function LanguageSwitcher() {
-   const router = useRouter();
    const { setSettings } = useJukiUserSettings();

    const switchTo = async (lang: Language) => {
      await setSettings([{ key: ProfileSetting.LANGUAGE, value: lang }]);
-     router.refresh();
+     // JukiI18nBridge calls router.refresh() automatically
    };
    /* ... */
  }
```

### 4. Move imports for server-safe components

For client component files that import any of `CircularProgress`, `NewlineInfo`, `ProblemStatus`, `ThemeColorPalette`, `DateLiteral`, `TextHeadCell`, `SubmissionMemory`, `SubmissionTime`:

```diff
- import { Modal, DateLiteral, T } from '@juki-team/base-ui';
+ import { Modal, T } from '@juki-team/base-ui';
+ import { DateLiteral } from '@juki-team/base-ui/server-components';
```

For Server Components, no change needed — the `react-server` conditional export resolves correctly.

Find affected files:

```bash
grep -rE "from ['\"]@juki-team/base-ui['\"]" src/ \
  | grep -E "CircularProgress|NewlineInfo|ProblemStatus|ThemeColorPalette|DateLiteral|TextHeadCell|SubmissionMemory|SubmissionTime"
```

### 5. Verify the build

```bash
rm -rf .next node_modules/.cache
pnpm install
pnpm build
```

The previous error `Export default doesn't exist in target module .../swr/dist/index/react-server.mjs [app-rsc]` should not appear.

### 6. Smoke tests

- Anonymous load → language comes from backend, not localStorage.
- Logged-in load → `user.settings.LANGUAGE` is respected.
- Switch language from the UI → text in client components updates immediately; text in Server Components updates after the bridge's automatic `router.refresh()`.
- View HTML source of an RSC page that uses `<T>welcome</T>` → strings are already translated server-side (no flash of raw keys).
- DevTools network tab → only one request per locale per server process to `/locale/<LOCALE>/translation`.

---

## [1.4.114] - 2026-05-05
## [1.4.113] - 2026-05-04
## [1.4.112] - 2026-05-03

Intermediate versions during the i18n refactor branch. See `2.0.0` for consolidated notes.

## [1.4.111] - 2026-05-02
## [1.4.110] - 2026-05-02

### Fixed
- Build issues with the RSC fix branch.

## [1.4.108] - 2026-05-02

### Changed
- Moved server-safe components into `**/server/` folders (`CircularProgress`, `NewlineInfo`, `ProblemStatus`, `Image`, `ThemeColorPalette`).

## [1.4.107] - 2026-05-01

### Fixed
- Guard against undefined organization in user store.

## [1.4.106] - prior

### Changed
- Set `publishConfig.access` to `public` for npm publish.

[Unreleased]: https://github.com/juki-team/base-ui/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/juki-team/base-ui/compare/v1.4.114...v2.0.0
[1.4.114]: https://github.com/juki-team/base-ui/compare/v1.4.113...v1.4.114
[1.4.113]: https://github.com/juki-team/base-ui/compare/v1.4.112...v1.4.113
[1.4.112]: https://github.com/juki-team/base-ui/compare/v1.4.111...v1.4.112
[1.4.111]: https://github.com/juki-team/base-ui/compare/v1.4.110...v1.4.111
[1.4.110]: https://github.com/juki-team/base-ui/compare/v1.4.108...v1.4.110
[1.4.108]: https://github.com/juki-team/base-ui/compare/v1.4.107...v1.4.108
[1.4.107]: https://github.com/juki-team/base-ui/compare/v1.4.106...v1.4.107