// src/components/TodoList.jsx
import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

const INITIAL_TODOS = [
  { id: 1, text: "Learn React Testing Library", completed: false },
  { id: 2, text: "Build Todo App", completed: true },
  { id: 3, text: "Push to GitHub", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(INITIAL_TODOS);

  function addTodo(text) {
    const newTodo = {
      id: Date.now(), // ok for demo (unique enough for this task)
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <section>
      <h1>Todo List</h1>

      <AddTodoForm onAdd={addTodo} />

      <ul aria-label="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              role="button"
              tabIndex={0}
              aria-label={`todo-item-${todo.id}`}
              onClick={() => toggleTodo(todo.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") toggleTodo(todo.id);
              }}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <button
              aria-label={`delete-${todo.id}`}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}