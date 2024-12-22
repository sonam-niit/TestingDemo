import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import TodoInput from "../../components/TodoInput";

describe("TodoInput.js test", () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
    })
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    })

    describe("TodoInput.js render test", () => {
        test('should have input field with a placeholder "my next goal"', () => {
            const mockSubmitHandler = jest.fn();
            render(<TodoInput submitHandler={mockSubmitHandler} />)
            expect(screen.getByPlaceholderText(/my next goal/)).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /add task/i })).toHaveAttribute("type", "submit");
        });
    });

    describe("TodoInput.js value change test", () => {
        test('should change value on key strokes', () => {
            const mockSubmitHandler = jest.fn();
            render(<TodoInput submitHandler={mockSubmitHandler} />)
            const inputField = screen.getByPlaceholderText(/my next goal/);
            fireEvent.change(inputField, { target: { value: "Go to gym!" } });
            expect(inputField.value).toBe("Go to gym!");
        });
    });

    describe('TodoInput.js submit button check', () => {
        test('should call "submitHandler function"', async () => {
            const mockSubmitHandler = jest.fn();
            render(<TodoInput onSubmit={mockSubmitHandler} />)
            const inputField = screen.getByPlaceholderText(/my next goal/);
            const button = screen.getByRole("button", { name: "add task" });
            fireEvent.change(inputField, { target: { value: "Go to gym now" } });
            fireEvent.click(button);
            // await waitFor(() => expect(mockSubmitHandler).toHaveBeenCalled());
            expect(mockSubmitHandler).toHaveBeenCalledWith({title:"Go to gym now"});
            await waitFor(() => expect(inputField.value).toBe(""));
        });
    });
    
})