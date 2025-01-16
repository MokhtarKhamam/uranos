import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

const TableLoader = () => {
  return (
    <TableBody>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <TableRow
          hover
          role="checkbox"
          tabIndex={-1}
          key={index}
          sx={{ cursor: "pointer" }}
        >
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <TableCell align="right" key={idx}>
              <Skeleton variant="rounded" width={210} height={60} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableLoader;
