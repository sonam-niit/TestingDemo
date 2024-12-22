import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../../components/TodoList";

describe("TodoList.js tests", () => {

    describe("TodoList.js render test", () => {
        test('should render lists provided, should show section title as "Todo List"', async () => {
            const mockTodoList = [{ _id: "ls93lj", title: "new todo 1" }, { _id: "edi38", title: "new todo 2" }];
            const mockSetTodoList = jest.fn();
            render(<TodoList todoList={mockTodoList} setTodoList={mockSetTodoList} />);
            expect(screen.getByText(/Todo List/)).toBeInTheDocument();
            mockTodoList.forEach((task) => {
                expect(screen.getByText(task.title)).toBeInTheDocument();
            });
            // const checkbox = screen.getAllByRole("checkbox")[0];
            // fireEvent.click(checkbox);
            // await waitFor(() => expect(mockSetTodoList).toHaveBeenCalled());
            expect(screen.getByText("new todo 1")).toBeInTheDocument();
            expect(screen.getByText("new todo 2")).toBeInTheDocument();
            
        })
    });
})