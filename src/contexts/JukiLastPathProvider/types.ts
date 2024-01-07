export type LastPathType<T extends string | number> = {
  [key in T]: {
    pathname: string,
    searchParams: URLSearchParams
  }
};

export interface LastPathContextInterface<T extends string | number> {
  pushPath: (props: { key: string, pathname: string, searchParams: URLSearchParams }) => void,
  lastPath: LastPathType<T>,
}
