import App from "../../App";
import { render, screen } from "@testing-library/react"

describe("Test App Componenet", () => {
    test("should have text 'Todo App' rendered on screen", () => {
        render(<App />)
        expect(screen.getByText(/Todo App/)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Todo App/ })).toBeInTheDocument();
    })
})