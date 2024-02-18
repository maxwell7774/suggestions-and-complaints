export default interface PagedList<Type> {
  items: Type[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  pageSize: number;
}
