import { useState } from "react";
import { useSnackbarAlerts } from "./useSnackbarAlerts";

export const useSearchNotes = () => {
  const [results, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { showErrorSnackbar } = useSnackbarAlerts();

  const searchNotes = async (title) => {
    if (!title.trim()) return;
    setIsSearching(true);
    setResult([]);
    try {
      const res = await fetch(
        `http://localhost:8000/notes/search?title=${title}`
      );
      if (!res.ok) {
        throw new Error("Notes Not Found");
      }
      const data = await res.json();
      setResult(data.data);
    } catch (error) {
      setResult([]);
      showErrorSnackbar(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  return { searchNotes, results, isSearching };
};
