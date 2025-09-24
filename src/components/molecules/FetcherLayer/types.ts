import type { ContentResponseType, ContentsResponseType, ErrorResponseType } from '@juki-team/commons';
import type { KeyedMutator, SWRConfiguration } from 'swr';
import type { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType } from '../../../types';

export interface FetcherLayerProps<T extends (ContentResponseType<U> | ContentsResponseType<U>), U extends any> {
  url: string | null,
  options?: SWRConfiguration,
  errorView?: ReactNodeOrFunctionP1Type<{
    data: ErrorResponseType | undefined,
    isLoading: boolean,
    error: any,
    mutate: KeyedMutator<any>
  }>,
  loadingView?: ReactNodeOrFunctionType,
  children: ReactNodeOrFunctionP1Type<{ data: T, isLoading: boolean, error?: any, mutate: KeyedMutator<any> }>,
  onError?: (error?: any) => void,
  triggerFetch?: number,
}
