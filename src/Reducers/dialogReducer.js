import { initialDialog } from "../constants/initialDialog";

export const dialogReducer = (state, action) => {
    switch (action.type) {
        case "open-add":
            return {
                ...initialDialog, open: true
                , type: "add",
                title: action.payload.title,
                content: action.payload.content,
                header: "Add Note"
            };
        case "open-edit":
            return {
                ...state,
                open: true,
                type: "edit",
                title: action.payload.title,
                content: action.payload.content,
                id: action.payload.id,
                header: "Edit Note"
            };
        case "open-delete":
            return {
                ...state,
                open: true,
                type: "delete",
                title: action.payload.title,
                id: action.payload.id,
                header: "Delete Note"
            };
        case "set-title":
            return { ...state, title: action.payload };
        case "set-content":
            return { ...state, content: action.payload };
        case "close":
            return { ...initialDialog };
        default:
            return state;
    }
};
