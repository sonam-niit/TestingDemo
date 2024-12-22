import { useEffect, useState } from "react";
import AccList from "./AccList";
import TodoList from "./TodoList";
import { apiRequest } from "./request";

function Lists() {
  const [array, setArray] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [accList, setAccList] = useState([]);

  useEffect(() => {
    const onRenderFetch = async () => {
      try {
        const { data, response } = await apiRequest("GET", `${process.env.REACT_APP_BACKEND}/api/todo`);
        if (data && data.todos && data.todos.length > 0) {
          setArray(data.todos);

          const filterTodo = array.filter(todo => todo.accomplished === false)
          setTodoList(filterTodo);

          const filterAccList = array.filter(todo => todo.accomplished === true);
          setAccList(filterAccList);
        }
      } catch (error) {
        console.log("Error fetching todo list:", error);
      }
    };
    onRenderFetch();
  }, [todoList, accList]);

  return (
      <div className="mt-5 d-flex flex-row justify-content-between">
        <div className="w-50">
          <TodoList todoList={todoList} setTodoList={setTodoList} />
        </div>
        <div className="w-50">
          <AccList accList={accList} setAccList={setAccList} />
        </div>
    </div>
    
  )
}

export default Lists;