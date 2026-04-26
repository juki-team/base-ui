import type { ContentResponse, ContentsResponse, ErrorResponse } from '@juki-team/commons/types';
import type { KeyedMutator, SWRConfiguration } from 'swr';
import type { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType } from '../../types';

export interface FetcherLayerProps<T extends ContentResponse<U> | ContentsResponse<U>, U> {
  url: string | null;
  options?: SWRConfiguration;
  errorView?: ReactNodeOrFunctionP1Type<{
    data: ErrorResponse | undefined;
    isLoading: boolean;
    error: unknown;
    mutate: KeyedMutator<T>;
  }>;
  loadingView?: ReactNodeOrFunctionType;
  children: ReactNodeOrFunctionP1Type<{ data: T; isLoading: boolean; error?: unknown; mutate: KeyedMutator<T> }>;
  onError?: (error?: unknown) => void;
  triggerFetch?: number;
}
