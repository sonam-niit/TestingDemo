const { default: mongoose } = require("mongoose");
const todo = require("../models/todo");

exports.postTodo = async (req, res) => {
    try {
        const {title} = req.body;
        if(!title || !title.trim()){
            return res.status(400).json({message: "Required field missing."})
        }
        const newTodo = new todo({title})
        await newTodo.save();
        return res.status(201).json({message: "new todo added."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong! Could not create new todo", error});
    }
}

exports.getTodo = async (req, res) => {
    try {
        const todos = await todo.find();
        return res.status(200).json({message: "ok", todos});
    } catch (error) {
        return res.status(500).json({message: "Something went wrong! Could not fetch todos", error: error.message});
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const reqBody = req.body;
        const todoId = req.params.id;
        if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ message: "Invalid or missing todo ID." });
        }

        const title = typeof(reqBody.title) === "string" && reqBody.title.trim().length > 0 ? reqBody.title.trim() : "";
        const accomplished = typeof(reqBody.accomplished) === "boolean" ? reqBody.accomplished : undefined;
        const completed = typeof(reqBody.completed) === "number" && reqBody.completed > 0 ? new Date(reqBody.completed) : undefined;

        let updateData = {};
        if (title) updateData.title = title;
        if (accomplished !== undefined) updateData.accomplished = accomplished;
        if (completed !== undefined) updateData.completed = completed;

        if (Object.keys(updateData).length == 0) {
            return res.status(400).json({ message: "No valid fields provided to update." });
        }

        const updatedTodo = await todo.findByIdAndUpdate(todoId, updateData, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        return res.status(200).json({ message: "Todo updated successfully", updatedTodo });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong! Could not update todo", error: error.message });
    }
};


exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        if (!todoId) {
            return res.status(400).json({ message: "required id missing." });
        }
        const deletedTodo = await todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        return res.status(200).json({ message: "todo deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong! Could not delete todo", error });
    }
}
