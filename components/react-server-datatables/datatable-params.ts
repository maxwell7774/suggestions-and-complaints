export default interface DatatableParams {
  apiUrl: string;
  primaryKeyProperty: string;
  page: number;
  pageSize: number;
  sortDir: "asc" | "desc";
  sortCol: string;
  searchTerm: string;
  searchCol: string;
}
