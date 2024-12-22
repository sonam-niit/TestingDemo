const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
require("dotenv").config();

const routes = require("./route/todo")

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "hello from server"});
})

app.use("/api/todo", routes)

app.use("*", (req, res) => {
    return res.status(404).json({ message: "not found" });
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;