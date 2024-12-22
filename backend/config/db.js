const mongoose = require("mongoose");

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected");
    } catch (error) {
        console.log("could not connect to mongo");
        console.error("Error connecting mongo", error);
        throw error;
    }
}

const mongoDisconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log("mongo disconnected");
    } catch (error) {
        console.log("Error disconnecting mongo ", error)
    }
}

module.exports = { mongoConnect, mongoDisconnect };