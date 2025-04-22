import { useState } from "react";

export const useAddNote = (refetch) => {
  const { error, setError } = useState(null);
  const addNote = async (note) => {
    try {
      await fetch("http://localhost:8000/notes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      refetch();
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
  };
  return { addNote, error };
};
