const { mongoConnect } = require("./config/db");
const app = require("./server");

const startServer = async () => {
    try {
        await mongoConnect();
        app.listen(process.env.BACKEND_PORT, () => {
            console.log(`Server is up and running on port ${process.env.BACKEND_PORT}`);
        })
    } catch (error) {
        console.log("Error connecting to database...", error);
    }
}

startServer();