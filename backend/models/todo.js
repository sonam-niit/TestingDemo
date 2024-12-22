const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    accomplished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    completed: {
        type: Date
    }
})

module.exports = mongoose.model("todo", todoSchema);