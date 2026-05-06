'use client';

import { Language, ProfileSetting } from '@juki-team/commons/enums';
import { consoleInfo } from '@juki-team/commons/helpers';
import { type ReactNode, useEffect, useRef } from 'react';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { I18nProvider } from '../../atoms/T/client';
import type { Dict } from '../../atoms/T/shared';

export interface JukiI18nBridgeProps {
  dicts: Record<string, Dict>;
  fallbackLocale?: string;
  /**
   * When the locale changes, reload the route so Server Components also
   * re-render with the new dict. Default `true`. Set to `false` if every
   * locale is preloaded in `dicts` and you only render translated text in
   * client components — the I18nContext swap is enough in that case.
   */
  refreshOnLocaleChange?: boolean;
  children?: ReactNode;
}

/**
 * Reads `user.settings.LANGUAGE` from the UserStore and feeds it as a
 * controlled prop to <I18nProvider>. When the user changes language (the
 * settings update goes through the user store), this bridge re-renders
 * and the I18nContext value swaps to the new dict. By default the route is
 * also reloaded so any text rendered by Server Components reflects the new
 * locale; opt out with `refreshOnLocaleChange={false}`.
 */
export function JukiI18nBridge({
  dicts,
  fallbackLocale = Language.EN,
  refreshOnLocaleChange = true,
  children,
}: JukiI18nBridgeProps) {
  const locale = useUserStore((s) => s.user.settings?.[ProfileSetting.LANGUAGE]) ?? fallbackLocale;
  const reloadRoute = useRouterStore((store) => store.reloadRoute);

  // Skip the initial render: the server already rendered with the right
  // locale and `setServerDict` was called in the layout. We only want to
  // reload the route when the user actively switches language afterwards.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!refreshOnLocaleChange) {
      return;
    }
    consoleInfo(`[i18n] locale changed to "${locale}" — reloading route`);
    reloadRoute();
  }, [reloadRoute, locale, refreshOnLocaleChange]);

  return (
    <I18nProvider locale={locale} dicts={dicts}>
      {children}
    </I18nProvider>
  );
}
