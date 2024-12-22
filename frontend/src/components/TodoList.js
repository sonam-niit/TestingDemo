// Todo List Panel

import { apiRequest } from "./request";

function TodoList({ todoList, setTodoList }) {

  const handleCheckboxChange = async (todoId) => {
    const { data, response } = await apiRequest("PUT", `${process.env.REACT_APP_BACKEND}/api/todo/${todoId}`, { accomplished: true, completed: Date.now() })
    if (data && response && response.status >= 200 && response.status <= 299) {
      const updatedList = todoList.filter(todo => todo._id !== todoId && todo.accomplished === false);
      setTodoList(updatedList);
    }
  };

  // const handleEdit = async () => {
  // }

  const handleDelete = async (todoId) => {
    try {
      const { data, response } = await apiRequest("DELETE", `${process.env.REACT_APP_BACKEND}/api/todo/${todoId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex flex-column">
      <h2>Todo List</h2>
      {todoList.map((todo) => {
        return (
          <div key={todo._id} className="todo-item form-check form-check-inline rounded bg-info mb-2 lh-sm">
            <input
              className="form-check-input border-secondary"
              type="checkbox"
              title="completed"
              checked={todo.accomplished}
              onChange={() => handleCheckboxChange(todo._id)}
            />
            <p className="text-start lh-1 small">{todo.title}</p>
            <div className="d-flex justify-content-between">
              <p className="mb-0" style={{fontSize: "10px", color: "#5c5a5a"}}>Created: {new Date(todo.createdAt).toLocaleDateString()}</p>
              <p className="mb-0" style={{fontSize: "10px", color: "#5c5a5a"}}>
                Completed: ____
              </p>
            </div>

            <div className="todo-actions">
              {/* <button onClick={() => handleEdit(todo._id)} className="btn btn-sm btn-warning">Edit</button> */}
              <button onClick={() => handleDelete(todo._id)} className="btn btn-sm btn-danger">delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
