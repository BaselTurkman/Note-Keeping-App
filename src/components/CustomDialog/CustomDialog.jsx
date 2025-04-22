import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useDialog } from "../../Context/DialogProvider";

export default function CustomDialog({ onConfirm }) {
  const { dialogState, dispatch } = useDialog();

  const handleClose = () => dispatch({ type: "close" });

  const handleConfirm = () => {
    onConfirm(dialogState);
    handleClose();
  };

  const handleChange = (field) => (e) => {
    dispatch({
      type: field === "title" ? "set-title" : "set-content",
      payload: e.target.value,
    });
  };

  return (
    <Dialog open={dialogState.open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {dialogState.type === "delete" && "Delete Note"}
        {dialogState.type === "add" && "Add Note"}
        {dialogState.type === "edit" && "Edit Note"}
      </DialogTitle>

      <DialogContent>
        {dialogState.type === "delete" ? (
          <DialogContentText>
            <Typography variant="body1">
              Are you sure you want to delete{" "}
              <Typography component="span" variant="body1" fontWeight="bold">
                {dialogState.title}
              </Typography>
              ?
            </Typography>
          </DialogContentText>
        ) : (
          <Box>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={dialogState.title}
              onChange={handleChange("title")}
            />
            <TextField
              margin="dense"
              label="Content"
              fullWidth
              multiline
              minRows={4}
              value={dialogState.content}
              onChange={handleChange("content")}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color={dialogState.type === "delete" ? "error" : "primary"}
          variant="contained"
        >
          {dialogState.type === "delete"
            ? "Delete"
            : dialogState.type === "edit"
            ? "Save"
            : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
