import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Pagination,
  Typography,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import { Data, HeadCell } from "../../constant/table";
import React, { SetStateAction, useCallback, useMemo, useState } from "react";
import { Order } from "../../types/table";
import TableLoader from "./TableLoader";
import { getComparator } from "../../utils/helpers";
import TruncatedTooltipText from "../TruncatedTooltipText";

interface TableProps {
  column: HeadCell[];
  isLoading: boolean;
  rows: any[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  error?: string; 
}

const TableGrid = ({
  column,
  isLoading,
  rows,
  totalPages,
  currentPage,
  setCurrentPage,
  error,
}: TableProps) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    []
  );

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper} sx={{ height: 440 }}>
        <Table stickyHeader sx={{ p: 2 }}>
          <EnhancedTableHead
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
            headCells={[...column]}
          />
          {isLoading ? (
            <TableLoader />
          ) : error ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={column.length} align="center">
                  <Typography color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={column.length} align="center">
                    There is no data available.
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    {column.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? "none" : "normal"}
                      >
                        <TruncatedTooltipText value={row[headCell.id]} /> {/* Access row value dynamically */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TableFooter
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </TableFooter>
    </Paper>
  );
};

export default TableGrid;