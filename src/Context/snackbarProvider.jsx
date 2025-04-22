import React, { createContext, useContext, useReducer } from "react";
import { Snackbar, Alert } from "@mui/material";
import { initialSnackbar } from "../constants/initialSnackbar";
import { snackbarReducer } from "../Reducers/snackbarReducer";
const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(snackbarReducer, initialSnackbar);

  const showSnackbar = (message, severity = "info") => {
    dispatch({ type: "show-snackbar", payload: { message, severity } });
  };

  const handleClose = () => {
    dispatch({ type: "hide-snackbar" });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={state.severity} variant="filled">
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
