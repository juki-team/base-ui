import { ParsedUrlQuery } from 'querystring';
import { create } from 'zustand';
import {
  AppendSearchParamsType,
  DeleteSearchParamsType,
  Href,
  RouterFn,
  SetSearchParamsType,
} from '../../components/types/router';

interface RouterState {
  searchParams: URLSearchParams,
  appendSearchParams: AppendSearchParamsType,
  setSearchParams: SetSearchParamsType,
  deleteSearchParams: DeleteSearchParamsType,
  routeParams: ParsedUrlQuery,
  pushRoute: RouterFn<Href>,
  replaceRoute: RouterFn<Href>,
  reloadRoute: RouterFn<void>,
  isLoadingRoute: boolean,
  origin: string,
  pathname: string,
  replaceProps: (props: Partial<Omit<RouterState, 'replaceProps'>>) => void,
}

export const useRouterStore = create<RouterState>((set) => ({
  searchParams: new URLSearchParams(''),
  appendSearchParams: () => null,
  deleteSearchParams: () => null,
  setSearchParams: () => null,
  routeParams: {},
  pushRoute: () => null,
  replaceRoute: () => null,
  reloadRoute: () => null,
  isLoadingRoute: false,
  origin: '',
  pathname: '',
  replaceProps: (props) => set({ ...props }),
}));
