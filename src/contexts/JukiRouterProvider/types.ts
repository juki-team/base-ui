import { ParsedUrlQuery } from 'querystring';

export type AppendSearchParamsType = (...props: { name: string, value: string, replace?: boolean }[]) => void;

export type SetSearchParamsType = (...props: { name: string, value: string | string[], replace?: boolean }[]) => void;

export type DeleteSearchParamsType = (...props: { name: string, value?: string, replace?: boolean }[]) => void;

export type RouterFn<T> = ((href: T) => Promise<void>) | ((href: T) => void);

export type Href = string | { pathname: string, searchParams?: URLSearchParams };

export type RouterContextInterface = {
  searchParams: URLSearchParams,
  appendSearchParams: AppendSearchParamsType,
  setSearchParams: SetSearchParamsType,
  deleteSearchParams: DeleteSearchParamsType,
  routeParams: ParsedUrlQuery,
  pushRoute: RouterFn<Href>,
  replaceRoute: RouterFn<Href>,
  reloadRoute: RouterFn<void>,
  isLoadingRoute: boolean,
  pathname: string,
};

type JukiRouterProviderRequiredProps = {
  routeParams: ParsedUrlQuery,
  pushRoute: RouterFn<string>,
  replaceRoute: RouterFn<string>,
  reloadRoute: RouterFn<void>,
  pathname: string,
  isLoadingRoute?: boolean,
}

export type JukiRouterProviderProps = JukiRouterProviderRequiredProps | ({
  searchParams: URLSearchParams,
  appendSearchParams: AppendSearchParamsType,
  setSearchParams: SetSearchParamsType,
  deleteSearchParams: DeleteSearchParamsType,
} & JukiRouterProviderRequiredProps);
