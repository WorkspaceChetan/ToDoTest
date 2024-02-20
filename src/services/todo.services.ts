import { TaskRequest } from "@/components/HomePage/types";
import { toast } from "react-toastify";

const apiBaseUrl = "/todoList";

export const fetchTodos = async () => {
  try {
    const response = await fetch(apiBaseUrl);

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Something went wrong!");
  }
};

export const fetchTodoById = async (id: string) => {
  try {
    const response = await fetch(apiBaseUrl + "/" + id);

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Something went wrong!");
  }
};

export const addTodo = async (values: TaskRequest) => {
  try {
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Something went wrong!");
  }
};

export const editTodo = async (values: TaskRequest, id: string) => {
  try {
    const response = await fetch(apiBaseUrl + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Something went wrong!");
  }
};

export const completeTodo = async (id: string) => {
  try {
    const response = await fetch(apiBaseUrl + "/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Something went wrong!");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await fetch(apiBaseUrl + "/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Something went wrong!");
  }
};
