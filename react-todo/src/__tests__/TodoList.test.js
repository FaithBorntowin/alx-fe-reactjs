import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders correctly with initial demo todos", () => {
    render(<TodoList />);

    expect(screen.getByText("Todo List")).toBeInTheDocument();
    expect(screen.getByText("Learn React Testing Library")).toBeInTheDocument();
    expect(screen.getByText("Build Todo App")).toBeInTheDocument();
    expect(screen.getByText("Push to GitHub")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);

    const input = screen.getByLabelText("todo-input");
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Todo Item")).toBeInTheDocument();
  });

  test("toggles a todo completed state when clicked", () => {
    render(<TodoList />);

    const todoText = screen.getByText("Learn React Testing Library");

    // initially NOT line-through
    expect(todoText).not.toHaveStyle("text-decoration: line-through");

    // click to toggle -> should become line-through
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle("text-decoration: line-through");

    // click again -> should remove line-through
    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo item", () => {
    render(<TodoList />);

    // confirm it exists
    expect(screen.getByText("Push to GitHub")).toBeInTheDocument();

    // click its delete button (we find it by text nearby or just use getAllByText)
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    // deleteButtons[0] might not be the one we want, so let's delete by finding the right list item:
    const todoItem = screen.getByText("Push to GitHub").closest("li");
    const deleteBtn = todoItem.querySelector("button");

    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Push to GitHub")).not.toBeInTheDocument();
  });
});