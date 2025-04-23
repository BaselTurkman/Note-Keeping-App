import { Grid } from "@mui/material";
import React from "react";
import NoteItem from "./NoteItem";

function NotesCollection({notes}) {
  return (
    <Grid container spacing={4} my={5}>
      {notes.map((note, index) => (
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
  );
}

export default NotesCollection;
