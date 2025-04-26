import { useSnackbarAlerts } from "./useSnackbarAlerts";

export const useDeleteNote = (refetch) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarAlerts();

  const deleteNote = async (id) => {
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
      showErrorSnackbar(message);
    }
  };

  return { deleteNote };
};
