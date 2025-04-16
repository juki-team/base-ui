import { PropsWithChildren } from 'react';

export interface LastPathProps<T> {
  lastPathKey: T,
  overwriteCompanyKey?: string,
}

export type LinkLastPathProps<T extends string | number = string, > = PropsWithChildren<LastPathProps<T>>;
