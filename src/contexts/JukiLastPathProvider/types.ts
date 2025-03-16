export type LastPathType<T extends string | number = string> = {
  [key in T]: {
    pathname: string,
    searchParams: URLSearchParams
  }
};
