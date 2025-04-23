import { useState } from "react";
import { useSnackbarAlerts } from "./useSnackbarAlerts";

export const useAddNote = (refetch) => {
  const [error, setError] = useState(null);
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarAlerts();

  const addNote = async (note) => {
    try {
      const res = await fetch("http://localhost:8000/notes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      if (!res.ok) {
        throw new Error("Failed to add Note")
      }
      refetch();
      showSuccessSnackbar("Note added successfully");
    } catch (err) {
      const message = err.message || "Something went wrong";
      setError(message);
      showErrorSnackbar(message);
    }
  };

  return { addNote, error };
};
