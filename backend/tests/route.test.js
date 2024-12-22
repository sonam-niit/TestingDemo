const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const server = require("../server");
const Todo = require("../models/todo");

describe("Todo API Tests", () => {
    let mongoServer;
    
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async() => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe("GET /api/todo test", () => {
        it("Should return all todos", async () => {

            await Todo.create({ title: "task 1" });
            await Todo.create({ title: "task 2" });
            
            const response = await supertest(server).get("/api/todo");

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("ok");
            expect(response.body.todos.length).toBe(2);
            expect(response.body.todos[0].title).toBe("task 1");
            expect(response.body.todos[1].title).toBe("task 2");
        });
    });


    describe("POST /api/todo test", () => {
        it("Should create todo", async () => {
            const response = await supertest(server).post("/api/todo").send({title: "task 1"});
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("new todo added.");
        });

        it("Should handle error if title value is missing", async () => {
            const response = await supertest(server).post("/api/todo").send({title: ""});
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Required field missing.");
        });

        it("Should handle error if title field is missing", async () => {
            const response = await supertest(server).post("/api/todo").send({});
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Required field missing.");
        });
    });


    describe('Update Todo API', () => {
        let todo;

        // Create a sample todo to test with
        beforeEach(async () => {
            todo = await Todo.create({
                title: 'Sample Todo',
                accomplished: false,
                completed: null,
            });
        });

        afterEach(async () => {
            await Todo.deleteMany({});
        });

        it('should update a todo with a valid title', async () => {
            const response = await supertest(server)
            .put(`/api/todo/${todo._id}`)
            .send({ title: 'Updated Todo' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Todo updated successfully');

            const updatedTodo = await Todo.findById(todo._id);
            expect(updatedTodo.title).toBe('Updated Todo');
        });

        it('should update a todo with valid completed status', async () => {
            const response = await supertest(server)
            .put(`/api/todo/${todo._id}`)
            .send({ completed: 1667779200000 });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Todo updated successfully');

            const updatedTodo = await Todo.findById(todo._id);
            expect(updatedTodo.completed).toBeTruthy();
        });

        it('should return an error if todo ID is invalid', async () => {
            const response = await supertest(server)
            .put('/api/todo/invalidTodoId')
            .send({ title: 'Invalid Todo' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid or missing todo ID.');
        });

        it('should return 404 if todo is not found', async () => {
            const nonExistingId = new mongoose.Types.ObjectId();
            const response = await supertest(server)
            .put(`/api/todo/${nonExistingId}`)
            .send({ title: 'Non Existing Todo' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Todo not found.');
        });

        it('should return an error if no valid fields are provided', async () => {
            const response = await supertest(server)
            .put(`/api/todo/${todo._id}`)
            .send({});

            expect(response.status).toBe(400);
            
            expect(response.body.message).toBe('No valid fields provided to update.'); 
        });
    });

    describe('Delete Todo API', () => {
        let todo;

        beforeEach(async () => {
            todo = await Todo.create({
            title: 'Sample Todo',
            accomplished: false,
            completed: null,
            });
        });

        afterEach(async () => {
            await Todo.deleteMany({});
        });

        it('should delete a todo with a valid id', async () => {
            const response = await supertest(server)
            .delete(`/api/todo/${todo._id}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('todo deleted');

            const deletedTodo = await Todo.findById(todo._id);
            expect(deletedTodo).toBeNull();
        });

        it('should return an error if todo ID is invalid', async () => {
            const response = await supertest(server)
            .delete('/api/todo/invalidTodoId');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Something went wrong! Could not delete todo');
        });

        it('should return 404 if todo is not found', async () => {
            const nonExistingId = new mongoose.Types.ObjectId();
            const response = await supertest(server)
            .delete(`/api/todo/${nonExistingId}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Todo not found.');
        });
    });
});