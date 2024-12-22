const controller = require("../controller/todo");
const Todo = require("../models/todo");

jest.mock("../models/todo.js");

const mockSave = jest.fn();
const mockFind = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();

// Todo.save = mockSave
Todo.find = mockFind;
Todo.mockImplementation(() => (
    {
        save: mockSave
    }));
Todo.findByIdAndUpdate = mockFindByIdAndUpdate;
Todo.findByIdAndDelete = mockFindByIdAndDelete;

describe("When todo controller is invoked", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {}
        };
        res = {
            json: jest.fn(() => res),
            status: jest.fn(() => res)
        }
    });

    describe("For getTodo functions", () => {
        it("It should retur all todos", async () => {
            const mockTodo = [
                { _id: 0, title: "new task 0", accomplished: false, completed: Date.now() },
                { _id: 1, title: "new task 1", accomplished: false, completed: Date.now() },
                { _id: 2, title: "new task 3", accomplished: false, completed: Date.now() },
            ]
            mockFind.mockResolvedValue(mockTodo);
            await controller.getTodo(req, res);

            expect(mockFind).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "ok", todos: mockTodo });
        });


        it("Should handle error if something goes wrogn", async () => {
            mockFind.mockRejectedValue("Something went wrong! Could not fetch todos");
            await controller.getTodo(req, res);

            expect(mockFind).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong! Could not fetch todos" })
        });
    });


    describe("For postTodo function", () => {
        it("Should create new todo", async () => {
            const mockTodo = { _id: 0, title: "learn testing using jest", accomplished: false, completed: Date.now() };
            req.body = { title: "learn testing using jest" };
            mockSave.mockResolvedValue(mockTodo);
            await controller.postTodo(req, res);

            expect(mockSave).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "new todo added." })
        });

        it("Should return 'Required field missing.' if title is missing", async () => {
            const message = "Required field missing.";
            req.body = { title: "" };
            mockSave.mockRejectedValue(message);
            await controller.postTodo(req, res);

            expect(mockSave).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: message });
        });

        it("Should return 'Required field missing.' if title property is missing", async () => {
            const message = "Required field missing.";
            req.body = {};
            mockSave.mockRejectedValue(message);
            await controller.postTodo(req, res);

            expect(mockSave).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: message });
        });
    });

    describe("For PUT updateTodo function", () => {

        it("Should return 'required id missing.', if :id params is not present", async () => {
            const todoData = { id: 1, title: "Sample Todo" }; //Mock Data
            const message = "Invalid or missing todo ID.";
            req.params = {};
            mockFindByIdAndUpdate.mockResolvedValue(todoData);
            await controller.updateTodo(req, res);

            expect(mockFindByIdAndUpdate).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: message });
        });
        it("Should return 'todo updated', if everything goes right", async () => {
            const todoData = { id: 1, title: "Sample Todo" }; //Mock Data
            const message = "Todo updated successfully";
            req.body = { accomplished: true, completed: Date.now() };
            req.params = { id: 1 };
            mockFindByIdAndUpdate.mockResolvedValue(todoData);
            await controller.updateTodo(req, res);

            expect(mockFindByIdAndUpdate).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: message, updatedTodo: { "id": 1, "title": "Sample Todo" } });
        });
    });

    describe("for DELETE deleteTodo functions", () => {

        it("Should return 'required id missing.', if :id is missing", async () => {
            const message = 'required id missing.';
            req.params = {};
            mockFindByIdAndDelete.mockResolvedValue(message);
            await controller.deleteTodo(req, res);

            expect(mockFindByIdAndDelete).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: message });
        });

        it("Should return 'todo deleted', if everythingn goes right", async () => {

            const todoData = { id: 1, title: "Sample Todo" }; //Mock Data
            req.params = { id: 1 };
            mockFindByIdAndDelete.mockResolvedValue(todoData);

            await controller.deleteTodo(req, res);

            expect(mockFindByIdAndDelete).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'todo deleted' });
        });
    })
});