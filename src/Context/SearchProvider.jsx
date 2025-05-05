import { createContext, useContext, useState } from "react";
import { useSearchNotes } from "../hooks/useSearchNotes";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const { results: searchResults, isSearching, searchNotes } = useSearchNotes();
  const [isInSearchMode, setIsInSearchMode] = useState(false);

  const handleClearSearch = () => {
    setIsInSearchMode(false);
  };

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setIsInSearchMode(false);
    } else {
      searchNotes(query);
      setIsInSearchMode(true);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        isSearching,
        isInSearchMode,
        handleSearch,
        handleClearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
