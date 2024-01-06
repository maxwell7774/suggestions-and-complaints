import { useEffect, useState } from "react";
import FilterParams from "../filter";
import { sort } from "fast-sort";
import { ColumnDef } from "../column";

//Filter hook that sorts and filters the data.
export function useDataTableFilter(
  data: any[],
  { searchColumns, searchStr, sortColumn, sortOrder }: FilterParams
) {
  //State variables
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [filterStatus, setFilterStatus] = useState<"filtered" | "unfiltered">(
    "filtered"
  );

  //Handles the filtering and sorting of the data
  const handleFilter = () => {
    //First filters based on the search string
    const newFilteredData = data.filter((row) => {
      let includeRow = false;
      searchColumns.forEach((col) => {
        if (("" + row[col.name]).includes(searchStr)) {
          includeRow = true;
        }
      });
      return includeRow;
    });

    //Second it sorts the data based on the sort column and sort order
    const sortedData = sortData(newFilteredData, sortOrder, sortColumn);

    //Sets the filter state to "filtered"
    setFilterStatus("filtered");

    //Sets the filteredData to the newly sorted/filtered data
    setFilteredData(sortedData);
  };

  //Runs the filter when the filterStatus changes
  useEffect(() => {
    if (filterStatus === "unfiltered" && data) {
      handleFilter();
    }
  }, [filterStatus]);

  return { filteredData, filterStatus, setFilterStatus };
}

//The sortdata functions to sort based on the column type
function sortData(
  data: any[],
  sortOrder: "asc" | "desc",
  sortColumn: ColumnDef
): any[] {
  if (sortColumn.type === "text" || sortColumn.type === "textarea") {
    return sort(data)[sortOrder]((row: any) =>
      ("" + row[sortColumn.name]).toLowerCase()
    );
  }

  if (sortColumn.type === "date") {
    return sort(data)[sortOrder]((row: any) => {
      return new Date(row[sortColumn.name]).getTime();
    });
  }

  if (sortColumn.type === "checkbox") {
    return sort(data)[sortOrder]((row: any) => {
      if (!row[sortColumn.name]) {
        return false;
      }
      return row[sortColumn.name];
    });
  }

  return sort(data)[sortOrder]((row: any) => {
    return row[sortColumn.name];
  });
}
