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
import { getSearchResultText } from "./utils/getSearchResultText";

function Notes() {
  const [currentPage, setCurrentPage] = useState(1);

  const { notes, pages, error, isLoading, fetchNotes } = useFetchNotes();
  const { searchResults, isInSearchMode, handleClearSearch, isSearching } =
    useSearchContext();
  const { addNote } = useAddNote(fetchNotes);
  const { deleteNote } = useDeleteNote(fetchNotes);
  const { editNote } = useEditNote(fetchNotes);

  const notesToRender = isInSearchMode ? searchResults : notes;
  const haveNotesToRender=notesToRender.length === 0

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
    
    if (isInSearchMode) {
      handleClearSearch();
    }
  };

  if (isLoading || isSearching) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="90vh">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Box p={5} my={2}>
      {error ? (
        <Typography color="error" variant="h4" mt={1}>
          {error}
        </Typography>
      ) : (
        <>
          <Typography variant="h4" mb={2}>
            My Notes
          </Typography>
          <NoteForm />
        </>
      )}

      {haveNotesToRender ? (
        <Typography variant="h5" mt={3}>
          No notes found
        </Typography>
      ) : (
        <NotesCollection notes={notesToRender} />
      )}
      {isInSearchMode && (
        <Typography
          variant="body1"
          component="div"
          mt={1}
          fontSize={20}
          textAlign="center"
          my={5}
        >
          {getSearchResultText(searchResults.length)}
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
