import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatatableParams from "./datatable-params";

interface Props {
  datatableParams: DatatableParams;
  setDatatableParams: (newDatatableParams: DatatableParams) => void;
  pageSizes?: number[];
}

//Pagesize component that allows the user to view more records
const DatatablePageSizeSelect = ({
  datatableParams,
  setDatatableParams,
  pageSizes = [5, 10, 25, 50, 100, 250],
}: Props) => {
  return (
    <div className="flex items-center">
      <p className="mr-2 text-xs whitespace-nowrap">Page Size:</p>
      <Select
        value={datatableParams.pageSize.toString()}
        onValueChange={(value) =>
          setDatatableParams({
            ...datatableParams,
            page: 1,
            pageSize: parseInt(value),
          })
        }
      >
        <SelectTrigger className="min-w-min h-8 w-14">
          <SelectValue defaultValue={datatableParams.pageSize.toString()} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pageSizes.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DatatablePageSizeSelect;
