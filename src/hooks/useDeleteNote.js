import { useState } from "react";
import { useSnackbarAlerts } from "./useSnackbarAlerts";

export const useDeleteNote = (refetch) => {
  const [error, setError] = useState(null);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarAlerts();
  const [isLoading, setIsLoading] = useState(false);

  const deleteNote = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/notes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to Delete Note");
      }

      refetch();
      showSuccessSnackbar("Note Deleted successfully");
    } catch (err) {
      const message = err.message || "Something went wrong";
      setError(message);
      showErrorSnackbar(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteNote, error, isLoading };
};
