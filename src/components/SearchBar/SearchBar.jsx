import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./styled/SearchBar.styled";
import { useSearchContext } from "../../Context/SearchProvider";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const { handleSearch, handleClearSearch } = useSearchContext();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    handleClearSearch();
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by title…"
        inputProps={{ "aria-label": "search" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {query && (
        <IconButton
          size="small"
          onClick={handleClear}
          sx={{ position: "absolute", right: 8, top: 6 }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </Search>
  );
}
