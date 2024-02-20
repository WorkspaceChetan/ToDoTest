import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ListItem, TaskRequest } from "./types";
import { toast } from "react-toastify";
import { addTodo, editTodo } from "@/services/todo.services";
import { useEffect } from "react";

const SaveTodoDialog = ({
  isEdit,
  open,
  todoItem,
  handleClose,
  fetchData,
}: {
  isEdit?: boolean;
  open: boolean;
  todoItem: ListItem | null;
  handleClose: () => void;
  fetchData: () => void;
}) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmitForm = async (values: TaskRequest) => {
    try {
      let response;
      if (isEdit) {
        response = await editTodo(values, todoItem?._id ?? "");
      } else {
        response = await addTodo(values);
      }

      if (response.success) {
        handleClose();
        fetchData();
        toast.success(`Task ${isEdit ? "created" : "updated"} successfully!`);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    setTouched,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmitForm,
  });

  useEffect(() => {
    setFieldValue("name", todoItem?.name ?? "");
    setFieldValue("description", todoItem?.description ?? "");
    setTouched({});
  }, [todoItem, open, setFieldValue, setTouched]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit" : "Add"} Task</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={4}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ textTransform: "none" }}
          >
            {isEdit ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default SaveTodoDialog;
