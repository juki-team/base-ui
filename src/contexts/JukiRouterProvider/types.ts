export type AppendSearchParamsType = (...props: { name: string, value: string, replace?: boolean }[]) => void;

export type SetSearchParamsType = (...props: { name: string, value: string | string[], replace?: boolean }[]) => void;

export type DeleteSearchParamsType = (...props: { name: string, value?: string, replace?: boolean }[]) => void;

export type RouterContextInterface = {
  searchParams: URLSearchParams,
  appendSearchParams: AppendSearchParamsType,
  setSearchParams: SetSearchParamsType,
  deleteSearchParams: DeleteSearchParamsType,
};

export type JukiRouterProviderProps = RouterContextInterface | {};
