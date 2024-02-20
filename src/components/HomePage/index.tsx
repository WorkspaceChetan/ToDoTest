import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, List } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { StyledCard, Title } from "./HomePage.styled";
import TodoListItem from "./TodoListItem";
import SaveTodoDialog from "./SaveTodoDialog";
import { useEffect, useState } from "react";
import { ListItem } from "./types";
import { fetchTodos, fetchTodoById } from "@/services/todo.services";

const HomeContainer = () => {
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [todoList, setTodoList] = useState<ListItem[]>();
  const [selectedTodo, setSelectedTodo] = useState<ListItem | null>(null);

  const handleOpenTodoModal = () => {
    setSelectedTodo(null);
    setOpenTodoModal(true);
  };

  const handleCloseTodoModal = () => {
    setOpenTodoModal(false);
    setSelectedTodo(null);
  };

  const handleEditIndex = async (id: string) => {
    const jsonData = await fetchTodoById(id);
    if (jsonData.success) setSelectedTodo(jsonData.data);
    setOpenTodoModal(true);
  };

  const fetchData = async () => {
    const res = await fetchTodos();
    setTodoList(res.listData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" gap={3} height="100vh">
        <Title>
          <Typography variant="h5">Todo Page</Typography>
        </Title>
        <Box overflow="auto" height="100%">
          <Container>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" justifyContent="end">
                <Button
                  variant="contained"
                  startIcon={<PlaylistAddIcon />}
                  sx={{ textTransform: "none" }}
                  onClick={handleOpenTodoModal}
                >
                  Add Task
                </Button>
              </Box>
              <StyledCard>
                <List sx={{ backgroundColor: "background.paper" }}>
                  {todoList?.length ? (
                    todoList.map((list, index) => (
                      <TodoListItem
                        key={index}
                        todoItem={list}
                        setEditIndex={handleEditIndex}
                        fetchData={fetchData}
                      />
                    ))
                  ) : (
                    <Box display="flex" justifyContent="center">
                      No data found!
                    </Box>
                  )}
                </List>
              </StyledCard>
            </Box>
          </Container>
        </Box>
      </Box>
      <SaveTodoDialog
        isEdit={Boolean(selectedTodo)}
        open={openTodoModal}
        todoItem={selectedTodo}
        handleClose={handleCloseTodoModal}
        fetchData={fetchData}
      />
    </>
  );
};

export default HomeContainer;
