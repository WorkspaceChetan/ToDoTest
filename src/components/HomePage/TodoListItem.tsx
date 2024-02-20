import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { ListItem as ListItemType } from "./types";
import { toast } from "react-toastify";
import { completeTodo, deleteTodo } from "@/services/todo.services";
import moment from "moment";

const TodoListItem = ({
  todoItem,
  setEditIndex,
  fetchData,
}: {
  todoItem: ListItemType;
  setEditIndex: (id: string) => void;
  fetchData: () => void;
}) => {
  const handleCompleteTask = async () => {
    const responseData = await completeTodo(todoItem._id);
    if (responseData.success) {
      fetchData();
    }
  };

  const handleDeleteTodo = async () => {
    const responseData = await deleteTodo(todoItem._id);

    if (responseData.success) {
      fetchData();
      toast.success("Task deleted succeesfull!");
    }
  };

  return (
    <ListItem
      component={"li"}
      alignItems="center"
      selected={todoItem.isCompleted}
      sx={{ borderBottom: "1px solid #eee" }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todoItem.isCompleted}
          onChange={handleCompleteTask}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText
        onClick={handleCompleteTask}
        primary={todoItem.name}
        sx={{
          cursor: "pointer",
          "& .MuiListItemText-primary": {
            textDecoration: todoItem.isCompleted ? "line-through" : "none",
          },
        }}
        secondary={
          <>
            <Typography>{todoItem.description}</Typography>
            <Typography>
              {todoItem.isCompleted && (
                <>
                  {moment(parseInt(todoItem.completedDate)).format(
                    "DD MMM YYYY hh:mm A"
                  )}
                </>
              )}
            </Typography>
          </>
        }
      />
      <IconButton onClick={() => setEditIndex(todoItem._id)}>
        <EditIcon color="primary" />
      </IconButton>
      <IconButton onClick={handleDeleteTodo}>
        <DeleteIcon color="error" />
      </IconButton>
    </ListItem>
  );
};

export default TodoListItem;
