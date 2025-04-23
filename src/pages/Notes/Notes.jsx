import React, { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NoteItem from "./components/NoteItem";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { useFetchNotes } from "../../hooks/useFetchNotes";
import { useAddNote } from "../../hooks/useAddNote";
import { useDeleteNote } from "../../hooks/useDeleteNote";
import { useEditNote } from "../../hooks/useEditNote";
import { useSearchContext } from "../../Context/SearchProvider";

function Notes() {
  const { notes, pages, error, isLoading, fetchNotes } = useFetchNotes();
  const { searchResults, isInSearchMode } = useSearchContext();
  const { addNote } = useAddNote(fetchNotes);
  const { deleteNote } = useDeleteNote(fetchNotes);
  const { editNote } = useEditNote(fetchNotes);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (!isInSearchMode) {
      fetchNotes(currentPage);
    }
  }, [currentPage, isInSearchMode]);

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="90vh">
        <CircularProgress />
      </Stack>
    );
  }

  const handleDialogConfirm = async (dialogState) => {
    if (dialogState.type === "delete") {
      await deleteNote(dialogState.id);
    } else if (dialogState.type === "add") {
      await addNote({ title: dialogState.title, content: dialogState.content });
    } else {
      const data = {
        title: dialogState.title,
        content: dialogState.content,
        id: dialogState.id,
      };
      await editNote(data);
      setCurrentPage(1);
    }
  };

  const notesToRender = isInSearchMode ? searchResults : notes;

  return (
    <Box p={5} my={2}>
      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {error}
        </Typography>
      )}
      {notes.length === 0 ? (
        <Typography variant="body1" mt={3}>
          No notes found
        </Typography>
      ) : (
        <>
          <Typography variant="h5">My Notes</Typography>
          <NoteForm />
          <Grid container spacing={4} my={5}>
            {notesToRender.map((note, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={note._id}>
                <NoteItem
                  title={note.title}
                  content={note.content}
                  creationDate={note.creationDate}
                  index={index}
                  id={note._id}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Stack alignItems="center" my={5}>
        {!isInSearchMode && (
          <Pagination
            count={pages}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
            hidden={error}
          />
        )}
      </Stack>
      {isInSearchMode && (
        <Typography variant="body2" mt={1}>
          {searchResults.length} result{searchResults.length !== 1 && "s"} found
        </Typography>
      )}
      <CustomDialog onConfirm={handleDialogConfirm} />
    </Box>
  );
}

export default Notes;
