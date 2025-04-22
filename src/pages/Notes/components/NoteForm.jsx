import { useState } from "react";
import { Box, TextField, Button, Collapse, Paper } from "@mui/material";

import { useDialog } from "../../../Context/DialogProvider";

function NoteForm() {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { dispatch } = useDialog();

  const handleCancel = () => {
    setExpanded(false);
    setTitle("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return;
    dispatch({
      type: "open-add",
      payload: {
        title,
        content,
      },
    });
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Box mt={1}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mr: 1 }}
              disabled={!title || !content}
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
