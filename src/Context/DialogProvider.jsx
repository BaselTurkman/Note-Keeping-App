import { createContext, useContext, useReducer } from "react";
import { dialogReducer } from "../Reducers/dialogReducer";
import { initialDialog } from "../constants/initialDialog";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogState, dispatch] = useReducer(dialogReducer, initialDialog);

  return (
    <DialogContext.Provider value={{ dialogState, dispatch }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
