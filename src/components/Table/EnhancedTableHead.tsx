import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Data, HeadCell } from "../../constant/table";
import { visuallyHidden } from "@mui/utils";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; 

type Order = "asc" | "desc";

interface EnhancedTableHeadProps {
  orderBy: string;
  order: Order;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  headCells: HeadCell[];
}

const EnhancedTableHead = ({
  orderBy,
  order,
  onRequestSort,
  headCells,
}: EnhancedTableHeadProps) => {
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ px: 2 }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={
              headCell.sortable
                ? orderBy === headCell.id
                  ? order
                  : false
                : false
            }
            sx={{
              width: headCell.width ? `${headCell.width}px` : `150px`,
              height: "50px"
            }}
          >
            <ResizableBox
              width={headCell.width || 150} 
              height={0} 
              minConstraints={[100, 0]} 
              maxConstraints={[400, 0]} 
              axis="x" 
              handle={
                <span
                  style={{
                    cursor: "col-resize",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: "100%",
                    width: "10px",
                    zIndex: 1,
                    touchAction: "none", 
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                  }}
                >
                  |
                </span>
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "10px",
                }}
              >
                <TableSortLabel
                  active={headCell.sortable && orderBy === headCell.id}
                  hideSortIcon={!headCell.sortable}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  sx={{ width: "100%" }} 
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </div>
            </ResizableBox>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
