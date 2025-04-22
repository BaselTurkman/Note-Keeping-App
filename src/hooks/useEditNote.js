export const useEditNote = (refetch) => {
    const editNote = async (updatedData) => {
        console.log(updatedData);
        
        try {
            await fetch(`http://localhost:8000/notes/${updatedData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: updatedData.title,
                    content: updatedData.content,
                }),

            });
            refetch();
        } catch (err) {
            console.error("Failed to update note", err);
        }
    };

    return { editNote };
}
