import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import NoteForm from "./components/NoteForm";
import NotesCollection from "./components/NotesCollection";
import CustomDialog from "../../components/CustomDialog/CustomDialog";

import { useFetchNotes } from "../../hooks/useFetchNotes";
import { useAddNote } from "../../hooks/useAddNote";
import { useDeleteNote } from "../../hooks/useDeleteNote";
import { useEditNote } from "../../hooks/useEditNote";
import { useSearchContext } from "../../Context/SearchProvider";

function Notes() {
  const [currentPage, setCurrentPage] = useState(1);

  const { notes, pages, error, isLoading, fetchNotes } = useFetchNotes();
  const { searchResults, isInSearchMode } = useSearchContext();
  const { addNote } = useAddNote(fetchNotes);
  const { deleteNote } = useDeleteNote(fetchNotes);
  const { editNote } = useEditNote(fetchNotes);

  const notesToRender = isInSearchMode ? searchResults : notes;

  useEffect(() => {
    if (!isInSearchMode) {
      fetchNotes(currentPage);
    }
  }, [currentPage, isInSearchMode]);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const handleDialogConfirm = async (dialogState) => {
    const { type, id, title, content } = dialogState;
    switch (type) {
      case "delete":
        await deleteNote(id);
        break;
      case "add":
        await addNote({ title, content });
        break;
      case "edit":
        await editNote({ id, title, content });
        break;
    }
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="90vh">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Box p={5} my={2}>
      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {error}
        </Typography>
      )}
      <Typography variant="h4" mb={2}>
        My Notes
      </Typography>
      <NoteForm />
      {notesToRender.length === 0 ? (
        <Typography variant="body1" mt={3}>
          No notes found
        </Typography>
      ) : (
        <NotesCollection notes={notesToRender} />
      )}
      {isInSearchMode && (
        <Typography variant="body1" mt={1}>
          {searchResults.length} result{searchResults.length !== 1 && "s"} found
        </Typography>
      )}
      <Stack alignItems="center" my={5}>
        {!isInSearchMode && (
          <Pagination
            count={pages}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
            hidden={!!error}
          />
        )}
      </Stack>
      <CustomDialog onConfirm={handleDialogConfirm} />
    </Box>
  );
}

export default Notes;
