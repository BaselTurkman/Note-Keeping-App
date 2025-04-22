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
import { useDialog } from "../../../Context/DialogProvider";

export default function NoteItem({ title, content, index, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const bgColor = bgColors[index % bgColors.length];
  const { dispatch } = useDialog();

  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    dispatch({
      type: "open-delete",
      payload: { title, id },
    });
  };

  const handleEditClick = () => {
    dispatch({
      type: "open-edit",
      payload: { title, content, id },
    });
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
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Delete">
          <Fade in={isHovered} timeout={300}>
            <IconButton
              size="large"
              edge="end"
              onClick={handleDeleteClick} 
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Fade>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
