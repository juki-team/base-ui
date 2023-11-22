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
  routerPush: RouterFn<Href>,
  routerReplace: RouterFn<Href>,
  routeIsLoading: boolean,
  pathname: string,
};

export type JukiRouterProviderProps = {
  searchParams: URLSearchParams,
  appendSearchParams: AppendSearchParamsType,
  setSearchParams: SetSearchParamsType,
  deleteSearchParams: DeleteSearchParamsType,
  routeParams: ParsedUrlQuery,
  routerPush: RouterFn<string>,
  routerReplace: RouterFn<string>,
  pathname: string,
} | {
  routeParams: ParsedUrlQuery,
  routerPush: RouterFn<string>,
  routerReplace: RouterFn<string>,
  pathname: string,
};
