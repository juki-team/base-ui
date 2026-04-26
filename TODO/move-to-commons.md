# Candidatos para mover a `@juki-team/commons`

Análisis de helpers, utils, constants, types y enums de `base-ui` que podrían vivir en `@juki-team/commons` por ser agnósticos a React/DOM/base-ui.

## 🟢 Helpers — funciones puras

| Archivo | Función | Razón |
|---|---|---|
| `src/components/helpers/text.ts` | `upperFirst` | Pura, ya está en otros packages similares (Lodash). Cero deps. |
| `src/components/helpers/router.ts` | `toFilterUrl`, `toSortUrl`, `getHref` | Pura URL/query string, no depende de DOM (usa `URLSearchParams` que es global). Acopla `RequestFilterType`/`RequestSortType`/`Href` que también valdría mover. |
| `src/components/helpers/contest.ts` | `getContestState` | Pura sobre `ContestTimeData` (ya en commons). Pero retorna clases CSS (`bc-io`, `bc-er`); habría que separar el dato del label visual. |
| `src/components/helpers/submission.ts` | `hasTimeHasMemory` | Una línea sobre `ProblemVerdict` (ya en commons). |
| `src/components/helpers/websocket.ts` | `getKeyWebSocketEventDTO`, `getUnsubscribeEvent` | 100% lógica sobre DTOs que ya viven en commons. **Encaja perfecto en commons.** |
| `src/components/helpers/problem.ts` | `getStatementData`, `getEditorSettingsStorageKey`, `getProblemsStoreKey`, `getSourcesStoreKey`, `getSettingsStoreKey`, `getTestCasesStoreKey` | Las `get*StoreKey` son puras (string templating). `getStatementData` es pura sobre tipos commons + `i18next` — `i18next` es agnóstica al runtime, solo si commons puede aceptarla como peer-dep. |
| `src/components/helpers/problem.ts` | `getJudgeOrigin` (sin la parte de `isJudgeWindowLocation`) | Si recibe el `windowOrigin` por parámetro, es pura. |
| `src/components/helpers/time.ts` | `cutTimeSplit` | Pura, opera sobre `splitTime` que ya está en commons. |
| `src/components/helpers/date.ts` | `showOfDateDisplayType`, `showOfTimeDisplayType` | Puras, sin runtime. **Encajan en commons** si los tipos `DateDisplayType` / `TimeDisplayType` se mueven con ellas. |
| `src/components/helpers/date.ts` | `getDateLiteral` | Pura sobre `i18n['t']`. Mismo caveat de `i18next` que arriba. |
| `src/components/helpers/commons.ts` | `normalizeFolderPath` | Regex puro, una línea. |
| `src/components/helpers/commons.ts` | `classNames` | Pura, agnóstica al runtime. (Aunque ya existe `clsx` en npm — discutible mover.) |

## 🟢 Constants — datos puros

| Archivo | Constante | Razón |
|---|---|---|
| `src/constants/index.ts` | `ALPHANUMERIC_DASH_UNDERSCORE_REGEX` | Regex puro. |
| `src/constants/index.ts` | `LEAST_ONE_UPPERCASE_LOWERCASE_NUMBER_REGEX` | Regex puro (probablemente reusable backend para validación). |
| `src/constants/index.ts` | `EMPTY_USER`, `EMPTY_COMPANY` | Datos sobre tipos commons (`UserPing`, `CompanyPingResponseDTO`). **Buen candidato** — los backends también necesitan defaults. |
| `src/constants/index.ts` | `DEFAULT_TIME_ZONE` | String literal. |
| `src/constants/index.ts` | `DAYS_2` | Derivado de `DAY_NAMES` (ya en commons). Trivial. |
| `src/constants/index.ts` | `PAGE_SIZE_OPTIONS` | Array de números. Agnóstico. |
| `src/constants/worksheet.ts` | `EMPTY_*_SHEET()` factories, `DEFAULT_GRAPH` | Factories sobre tipos de commons. **Encajan perfecto** salvo que dependen de `uuid`, que commons tendría que aceptar como dep. |
| `src/constants/worksheet.ts` | `WORKSHEET_CODE_EDITOR_MIN_HEIGHT` | Número. UI-ish, dudoso. |

## 🟢 Enums — todos son agnósticos al runtime

| Enum | Comentario |
|---|---|
| `QueryParamKey` | Strings de query params. Reusable en backend si parsea esos params. |
| `ProblemTab`, `ContestsTab`, `ContestTab`, `ProfileTab`, `WorksheetTab` | Strings de rutas. Backend podría usarlos para validar. |
| `Period` | Estados temporales, lógica de dominio. **Sí.** |
| `Duration` | Numéricos UI. Más bien base-ui. |
| `Sound` | Solo UI. **No mover.** |
| `TriggerAction` | Solo UI (`hover`/`click`). **No mover.** |

## 🟢 Types — los que no son React/DOM

- `DateDisplayType`, `TimeDisplayType` (`src/components/types/index.ts:142,155`) — string literals puros, **encajan en commons** y harían sentido junto a las helpers `showOfDateDisplayType`.
- `Href`, `RequestFilterType`, `RequestSortType` (usados en `helpers/router.ts`) — si se mueven los helpers, los tipos también.

---

## ❌ NO mover (acoplamiento a base-ui / DOM)

| Archivo | Razón |
|---|---|
| `src/components/helpers/commons.ts` (excepto lo listado arriba) | `getTextContent` (React), `downloadLink`/`downloadBlobAsFile`/`downloadUrlAsFile` (DOM), `toBlob` (Canvas), `isOverflowed` (DOM ref), `openNewTab` (window), `renderChildrenWithProps` (React) |
| `src/components/helpers/copy.ts` | `navigator.clipboard` |
| `src/components/helpers/fetch.ts` | Acopla `localStorage`, `window`, `jukiApiManager` (singleton de base-ui) |
| `src/components/helpers/layout.ts` | `oneTab` retorna ReactNode |
| `src/components/helpers/render.tsx` | JSX puro |
| `src/components/helpers/store.ts` | `localStorage` + iframes |
| `src/components/helpers/visibility.ts` | `document.addEventListener` |
| `src/components/helpers/worksheet.ts` | UI-specific (alturas en px) |
| `src/components/helpers/xlsx.ts` | Dynamic import del paquete xlsx, browser-side |
| `src/constants/settings.ts` | `import.meta.env`/`process.env`, `swr` config |
| `src/constants/index.ts` (resto) | `EMPTY_ARRAY`, `EMPTY_OBJECT`, `SCROLL_WIDTH`, `RESIZE_DETECTOR_PROPS`, `DEFAULT_DATA_VIEWER_PROPS`, `CODE_EDIT0R_*` — son UI o framework-específicos |

---

## Recomendación de prioridad

Orden de menor a mayor riesgo:

1. **Trivial**: `upperFirst`, `hasTimeHasMemory`, `normalizeFolderPath`, regex de `constants/index.ts`, `DAYS_2`, `DEFAULT_TIME_ZONE`, `PAGE_SIZE_OPTIONS`. → 1 PR.
2. **Con tipo**: `DateDisplayType`/`TimeDisplayType` + `showOfDateDisplayType`/`showOfTimeDisplayType` + `cutTimeSplit`. → 1 PR.
3. **WebSocket helpers**: `getKeyWebSocketEventDTO`, `getUnsubscribeEvent`. → 1 PR (alto valor, ya consume puros DTOs de commons).
4. **Datos por defecto**: `EMPTY_USER`, `EMPTY_COMPANY`, `EMPTY_*_SHEET()` factories. → 1 PR (requiere mover dep `uuid` a commons o aceptar el id como parámetro).
5. **Router helpers**: `toFilterUrl`, `toSortUrl`, `getHref`, `Href`, `RequestFilterType`, `RequestSortType`. → 1 PR (toca muchos consumers).
6. **Enums de tabs/queries**: si efectivamente son compartidos con backend. → 1 PR.