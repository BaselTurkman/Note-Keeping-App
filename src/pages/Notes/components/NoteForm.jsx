import { useState } from "react";
import { Box, TextField, Button, Collapse, Paper } from "@mui/material";
import { useDialogActions } from "../../../hooks/useDialogActions";

function NoteForm() {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });
  const { openAddDialog } = useDialogActions();

  const handleTitleChange = (e) => {
    setNote((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (e) => {
    setNote((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleCancel = () => {
    setExpanded(false);
    setNote({ title: "", content: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content) return;
    openAddDialog(note);
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Collapse in={!expanded}>
        <Box onClick={() => setExpanded(true)} sx={{ cursor: "pointer" }}>
          Click here to add a new note...
        </Box>
      </Collapse>
      <Collapse in={expanded}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={note.title}
            onChange={handleTitleChange}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={note.content}
            onChange={handleContentChange}
          />
          <Box mt={1}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mr: 1 }}
              disabled={!note.title || !note.content}
            >
              Save
            </Button>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </form>
      </Collapse>
    </Paper>
  );
}

export default NoteForm;
