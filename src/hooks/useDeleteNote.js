import { useState } from "react";

export const useDeleteNote = (refetch) => {
    const [ error, setError ] = useState(null)
    const deleteNote = async (id) => {
        try {
            await fetch(`http://localhost:8000/notes/${id}`, {
                method: "DELETE",
            });
            refetch();
        } catch (err) {
            setError(error || "Something went wrong");
        }
    };

    return {deleteNote, error};
}
