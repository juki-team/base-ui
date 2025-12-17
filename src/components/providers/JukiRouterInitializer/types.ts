import { ParsedUrlQuery } from 'querystring';
import { AppendSearchParamsType, DeleteSearchParamsType, RouterFn, SetSearchParamsType } from '../../types';

export type JukiRouterBaseProps = {
  routeParams: ParsedUrlQuery,
  pushRoute: RouterFn<string>,
  replaceRoute: RouterFn<string>,
  reloadRoute: RouterFn<void>,
  pathname: string,
  isLoadingRoute: boolean,
};

type JukiRouterSearchDisabled = {
  searchParams?: undefined,
  appendSearchParams?: undefined,
  setSearchParams?: undefined,
  deleteSearchParams?: undefined,
};

type JukiRouterSearchEnabled = {
  searchParams: URLSearchParams,
  appendSearchParams: AppendSearchParamsType,
  setSearchParams: SetSearchParamsType,
  deleteSearchParams: DeleteSearchParamsType,
};

export type JukiRouterInitializerProps = JukiRouterBaseProps & (JukiRouterSearchDisabled | JukiRouterSearchEnabled);
