import { FC, PropsWithChildren } from 'react';
import { ImageCmpProps } from './Image';
import { LinkCmpProps } from './Link';

export interface UIComponentsContextInterface {
  Image: FC<ImageCmpProps>;
  Link: FC<PropsWithChildren<LinkCmpProps>>;
}

export type AppendSearchParamsType = (...props: { name: string, value: string, replace?: boolean }[]) => void;

export type SetSearchParamsType = (...props: { name: string, value: string | string[], replace?: boolean }[]) => void;

export type DeleteSearchParamsType = (...props: { name: string, value?: string, replace?: boolean }[]) => void;

export interface UIRouterContextInterface {
  searchParams: URLSearchParams,
  appendSearchParams: AppendSearchParamsType,
  setSearchParams: SetSearchParamsType,
  deleteSearchParams: DeleteSearchParamsType,
}

export interface JukiUIProviderProps {
  components?: Partial<UIComponentsContextInterface>,
  router?: UIRouterContextInterface,
}
