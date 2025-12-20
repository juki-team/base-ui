export interface PaginationProps {
  dataLength: number,
  total: number,
  page: number,
  pageSize: number,
  loading: boolean,
  initializing: boolean,
  pageSizeOptions: number[],
  jumpToPage: (page: number) => void,
  onPageSizeChange: (pageSize: number) => void,
  isOnToolbar?: boolean,
}
