import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Fade,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { bgColors } from "../../../constants/bgColors";
import { formatDate } from "../../../utils/formatDate";
import { useDialogActions } from "../../../hooks/useDialogActions";

export default function NoteItem({ title, content, index, id, creationDate }) {
  const [isHovered, setIsHovered] = useState(false);
  const {openEditDialog, openDeleteDialog} = useDialogActions()
  const displayDate = formatDate(creationDate);
  const bgColor = bgColors[index % bgColors.length];

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    openDeleteDialog({title, id})
  };

  const handleEditClick = () => {
    openEditDialog({title, content, id})
  };

  return (
    <Card
      sx={{ maxWidth: 345, backgroundColor: bgColor, transition: "0.3s" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEditClick}
    >
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {content}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {displayDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Delete">
          <Fade in={isHovered} timeout={300}>
            <IconButton size="large" edge="end" onClick={handleDeleteClick}>
              <DeleteIcon color="error" />
            </IconButton>
          </Fade>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
