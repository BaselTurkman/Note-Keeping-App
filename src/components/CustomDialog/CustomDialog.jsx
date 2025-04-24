import React, { useState } from "react";
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
import { LoadingButton } from "@mui/lab";
import { useDialog } from "../../Context/DialogProvider";
import { useDialogActions } from "../../hooks/useDialogActions";

export default function CustomDialog({ onConfirm }) {
  const { dialogState } = useDialog();
  const { setDialogContent, setDialogTitle, closeDialog } = useDialogActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => closeDialog();

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm(dialogState);
    setIsLoading(false);
    handleClose();
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    field === "title" ? setDialogTitle(value) : setDialogContent(value);
  };

  return (
    <Dialog open={dialogState.open} onClose={handleClose} fullWidth>
      <DialogTitle>{dialogState.header}</DialogTitle>

      <DialogContent>
        {dialogState.type === "delete" ? (
          <DialogContentText>
            <Typography variant="body1" component="span">
              Are you sure you want to delete
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
        <LoadingButton
          onClick={handleConfirm}
          color={dialogState.type === "delete" ? "error" : "primary"}
          variant="contained"
          loading={isLoading}
        >
          {dialogState.type === "delete"
            ? "Delete"
            : dialogState.type === "edit"
            ? "Save"
            : "Add"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
