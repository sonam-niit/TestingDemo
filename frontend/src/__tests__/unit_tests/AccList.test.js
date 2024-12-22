import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccList from "../../components/AccList";

describe("TodoList.js tests", () => {

    describe("AccList.js render test", () => {
        test('should render lists provided, should show section title as "Accomplished"', async () => {
            const mockAccList = [{ _id: "ls93lj", title: "new todo 1" }, { _id: "edi38", title: "new todo 2" }];
            const mockSetAccList = jest.fn();
            render(<AccList accList={mockAccList} setAccList={mockSetAccList} />);
            expect(screen.getByText(/Accomplished/)).toBeInTheDocument();
            mockAccList.forEach((task) => {
                expect(screen.getByText(task.title)).toBeInTheDocument();
            });
            // const checkbox = screen.getAllByRole("checkbox")[0];
            // fireEvent.click(checkbox);
            // await waitFor(() => expect(mockSetAccList).toHaveBeenCalled());
            expect(screen.getByText("new todo 1")).toBeInTheDocument();
            expect(screen.getByText("new todo 2")).toBeInTheDocument();
        })
    });
})