const supertest = require("supertest");
const server = require("../server");

describe("Server Initialization Testing...", () => {
    test("Root Route Testing /", async () => {
        const response = await supertest(server).get("/");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("hello from server")
    });
});