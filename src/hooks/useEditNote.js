import { useSnackbarAlerts } from "./useSnackbarAlerts";

export const useEditNote = (refetch) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarAlerts();
  const editNote = async (updatedData) => {
    try {
      const res = await fetch(`http://localhost:8000/notes/${updatedData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedData.title,
          content: updatedData.content,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update note");
      }
      showSuccessSnackbar("Note Updated successfully");
      refetch();
    } catch (err) {
      showErrorSnackbar(err.message || "Something went wrong");
    }
  };

  return { editNote };
};
