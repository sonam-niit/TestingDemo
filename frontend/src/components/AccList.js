// Accomplished List Panel

import { apiRequest } from "./request";

function AccList({ accList, setAccList }) {

  const handleCheckboxChange = async (todoId) => {
    const { data, response } = await apiRequest("PUT", `${process.env.REACT_APP_BACKEND}/api/todo/${todoId}`, { accomplished: false, completed: null })
    if (data && response && response.status >= 200 && response.status <= 299) {
      const updatedList = accList.filter(todo => todo._id !== todoId && todo.accomplished === true);
      setAccList(updatedList);
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
      <h2>Accomplished</h2>
      {accList.map((todo) => {
        return (
          <div key={todo._id} className="todo-item form-check form-check-inline rounded bg-secondary mb-2 lh-sm">
            <input
              className="form-check-input border-secondary"
              type="checkbox"
              title="completed"
              checked={todo.accomplished}
              onChange={() => handleCheckboxChange(todo._id)}
            />
            <p className="text-start text-decoration-line-through lh-1 small">{todo.title}</p>
            <div className="d-flex justify-content-between">
              <p className="mb-0" style={{fontSize: "10px", color: "#262525"}}>Created: {new Date(todo.createdAt).toLocaleDateString()}</p>
              <p className="mb-0" style={{fontSize: "10px", color: "#262525"}}>
                Completed: {new Date(todo.completed).toLocaleDateString()}
              </p>
            </div>
            <div className="todo-actions">
              {/* <button onClick={() => handleEdit(todo._id)} className="btn btn-sm btn-warning">Edit</button> */}
              <button onClick={() => handleDelete(todo._id)} className="btn btn-sm btn-danger">delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AccList;
