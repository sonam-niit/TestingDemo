const router = require("express").Router();
const { postTodo, getTodo, updateTodo, deleteTodo } = require("../controller/todo")

router.post("/", postTodo);
router.get("/", getTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;