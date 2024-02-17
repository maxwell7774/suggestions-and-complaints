import * as React from "react";
import { Table } from "../ui/table";
import { Card } from "../ui/card";

interface DatatableRootProps extends React.HTMLAttributes<HTMLTableElement> {
  bordered?: boolean;
}

const DatatableRoot = React.forwardRef<HTMLTableElement, DatatableRootProps>(
  ({ bordered = true, ...props }: DatatableRootProps, ref) => {
    if (bordered) {
      return (
        <Card className="overflow-hidden">
          <Table ref={ref} {...props} />
        </Card>
      );
    }

    return <Table ref={ref} {...props} />;
  }
);
DatatableRoot.displayName = "DatatableRoot";

export default DatatableRoot;
