import { useState, useEffect } from "react";
import { useSnackbarAlerts } from "./useSnackbarAlerts";

export const useFetchNotes = () => {
    const [notes, setNotes] = useState([]);
    const [pages, setPages] = useState(0);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { showErrorSnackbar } = useSnackbarAlerts();

    const fetchNotes = async (page = 1) => {
        try {
            setIsLoading(true)
            const res = await fetch(`http://localhost:8000/notes?page=${page}`)
            if (!res.ok) {
                throw new Error("Failed to fetch notes");
            }
            const data = await res.json()
            setNotes(data.notes)
            setPages(data.totalPages)
        }
        catch(error){
            const message = error.message || "Something went wrong"
            setError(message);
            showErrorSnackbar(message)
        }
        finally{
            setIsLoading(false)
        }
    }
    
    return {notes, pages, error, isLoading, fetchNotes}
}