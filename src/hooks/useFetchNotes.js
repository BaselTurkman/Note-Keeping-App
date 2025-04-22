import { useState, useEffect } from "react";

export const useFetchNotes = () => {
    const [notes, setNotes] = useState([]);
    const [pages, setPages] = useState(0);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
            setError(error.message || "Something went wrong");
        }
        finally{
            setIsLoading(false)
        }
    }
    
    return {notes, pages, error, isLoading, fetchNotes}
}