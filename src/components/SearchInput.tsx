import { InputBase } from "@mui/material";
import { SxProps, styled, Theme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  height: 48,
  borderRadius: 8,
  border: "1px solid gray",
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

type PropsType = {
  placeholder?: string;
  onChange: (searchTerm: string) => void;
  width?: string | number;
  customIconColor?: string;
  sx?: SxProps<Theme>;
  componentsProps?: {
    container?: SxProps<Theme>;
  };
};

const SearchInput = (props: PropsType) => {

  return (
    <Search
      sx={{
        "& .MuiInputBase-root": {
          width: props.width,
        },
        ...props.componentsProps?.container,
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={props.placeholder ?? "Search…"}
        onChange={(e) => props.onChange(e.target.value)}
        sx={{ mt: 0.75, width: "100%", ...props?.sx }}
        inputProps={{
          "aria-label": "search",
        }}
      />
    </Search>
  );
};

export default SearchInput;
