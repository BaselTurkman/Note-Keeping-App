import { useDialog } from "../Context/DialogProvider";

export const useDialogActions = () => {
    const { dispatch } = useDialog();

    const openAddDialog = ({ title = "", content = "" }) => {
        dispatch({ type: "open-add", payload: { title, content } });
    };

    const openEditDialog = ({ id, title, content }) => {
        dispatch({ type: "open-edit", payload: { id, title, content } });
    };

    const openDeleteDialog = ({ id, title }) => {
        dispatch({ type: "open-delete", payload: { id, title } });
    };

    const setDialogTitle = (title) => {
        dispatch({ type: "set-title", payload: title });
    };

    const setDialogContent = (content) => {
        dispatch({ type: "set-content", payload: content });
    };

    const closeDialog = () => {
        dispatch({ type: "close" });
    };

    return {
        openAddDialog,
        openEditDialog,
        openDeleteDialog,
        setDialogTitle,
        setDialogContent,
        closeDialog,
    };
};
