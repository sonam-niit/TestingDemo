import "@testing-library/jest-dom";
import { render, fireEvent, screen, cleanup, waitFor } from "@testing-library/react";
import AccList from "../../components/AccList";
import TodoList from "../../components/TodoList";
import { apiRequest } from "../../components/request";
import TodoInput from "../../components/TodoInput";
import Lists from "../../components/Lists";

jest.mock("../../components/request.js", () => ({
    apiRequest: jest.fn()
}));

describe("Integration tests", () => {
    beforeAll(() => {
        cleanup();
        jest.clearAllMocks();
    })

    describe("TodoInput.js must be able to create new todo", () => {
        test('should create new todo', async () => {
            const newTodoToBeCreated = { title: "new Todo here 1" };
            apiRequest.mockResolvedValue({ response: { status: 201 } });
            const mockSubmitHandler = jest.fn();
            render(<TodoInput submitHandler={mockSubmitHandler} />)
            const inputField = screen.getByPlaceholderText("my next goal");
            const button = screen.getByRole("button", { name: 'add task' });
            
            fireEvent.change(inputField, { target: { value: newTodoToBeCreated.title } });
            fireEvent.click(button)

            await waitFor(() => expect(apiRequest).toHaveBeenCalledWith("POST", `${process.env.REACT_APP_BACKEND}/api/todo`, newTodoToBeCreated));
            await waitFor(() => expect(inputField.value).toBe(""));
        })
    });

    describe("Lists.js must be able to get all todos from backend", () => {
        beforeAll(async () => {
            let mockFetchTodosList = [
                { _id: "ofdfkj73", title: "new title 1", accomplished: false },
                { _id: "ofdfkj74", title: "new title 2", accomplished: false },
                { _id: "ofdfkj75", title: "new title 3", accomplished: false },
            ]
            await apiRequest.mockResolvedValue({ data: { todos: mockFetchTodosList } })
        })

        afterAll(() => cleanup())

        test("Should fetch all todos", async () => {
            render(<Lists />)
            await waitFor(() => expect(apiRequest).toHaveBeenCalledWith("GET", `${process.env.REACT_APP_BACKEND}/api/todo`));
        })
    })
})