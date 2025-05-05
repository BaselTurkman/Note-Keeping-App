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
import { DIALOG_BUTTON_LABELS } from "./constants";

export default function CustomDialog({ onConfirm }) {
  const { dialogState } = useDialog();
  const { setDialogContent, setDialogTitle, closeDialog } = useDialogActions();
  const [isLoading, setIsLoading] = useState(false);

  const isEditType = dialogState.type === "edit";
  const isDeleteType = dialogState.type === "delete";

  const dialogText =
    DIALOG_BUTTON_LABELS[dialogState.type] || (isEditType ? "Save" : "Add");

  const handleClose = () => closeDialog();

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm(dialogState);
    setIsLoading(false);
    closeDialog();
  };

  return (
    <Dialog open={dialogState.open} onClose={handleClose} fullWidth>
      <DialogTitle>{dialogState.header}</DialogTitle>

      <DialogContent>
        {isDeleteType ? (
          <DialogContentText>
            Are you sure you want to delete{" "}
            <Typography component="span" fontWeight="bold">
              {dialogState.title}
            </Typography>
            ?
          </DialogContentText>
        ) : (
          <Box>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={dialogState.title}
              onChange={(e) => setDialogTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Content"
              fullWidth
              multiline
              minRows={4}
              value={dialogState.content}
              onChange={(e) => setDialogContent(e.target.value)}
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
          color={isDeleteType ? "error" : "primary"}
          variant="contained"
          loading={isLoading}
        >
          {dialogText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
