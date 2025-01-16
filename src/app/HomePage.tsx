import { Box, Container, Paper, Stack } from "@mui/material";
import { useState } from "react";
import SearchInput from "../components/SearchInput";
import { debounce } from "lodash";
import { useQuery } from "react-query";
import axios from "axios";
import { headCells } from "../constant/table";
import TableGrid from "../components/Table";

interface ErrorResponse {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching, error } = useQuery<any, ErrorResponse>(
    ["products", search, currentPage],
    () => {
      return axios.get(
        `http://51.79.251.109:5498/api/product?q=${search}&pageNumber=${currentPage}`
      );
    },
    {
      keepPreviousData: true,
    }
  );

  console.log(error);

  const tableData = data?.data.data.data || [];
  const number = data?.data.data.count || 1;
  const totalPages = Math.ceil(number / 100);

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Stack direction="row" justifyContent="space-between" gap={3} my={3}>
          <Stack width="50%">
            <SearchInput
              onChange={debounce((e) => {
                setSearch(e);
              }, 500)}
            />
          </Stack>
        </Stack>
        <Paper sx={{ width: "100%" }}>
          <TableGrid
            column={[...headCells]}
            isLoading={isFetching}
            rows={tableData || []}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            error={error?.response?.data?.message}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
