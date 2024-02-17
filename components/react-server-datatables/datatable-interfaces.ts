export interface Datatable {
  apiUrl: string;
  primaryKeyField: string;
  zodSchema: Zod.AnyZodObject;
  page: number;
  setPage: (newPage: number) => void;
  pageSize: number;
  setPageSize: (newPageSize: number) => void;
  searchTerm: string;
  sortBy: string;
  sortDir: "asc" | "desc";
  searchFilters: SearchFilter[];
  setSearchFilters: (newSearchFilters: SearchFilter[]) => void;
  setSortBy: (newSortBy: string) => void;
  setSortDir: (newSortDir: "asc" | "desc") => void;
  setSearchTerm: (newSearchTerm: string) => void;
  addSearchField: (newSearchField: string) => void;
  removeSearchField: (searchFieldToRemove: string) => void;
  isSearchFieldSet: (searchField: string) => boolean;
  clearSearchFields: () => void;
  addSearchFilter: (newSearchFilter: SearchFilter) => void;
  removeSearchFilter: (searchFilterToRemove: SearchFilter) => void;
  removeSearchFiltersByField: (field: string) => void;
  removeSearchFiltersByFieldAndOperator: (
    field: string,
    operator: string
  ) => void;
  isSearchFilterSet: (searchFilter: SearchFilter) => boolean;
  isSearchFilterWithFieldSet: (field: string) => boolean;
  isSearchFilterWithFieldAndOperatorSet: (
    field: string,
    operator: string
  ) => boolean;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  editMode: boolean;
  setEditMode: (newValue: boolean) => void;
}

export interface SearchFilter {
  field: string;
  operator: string;
  value: string;
}
