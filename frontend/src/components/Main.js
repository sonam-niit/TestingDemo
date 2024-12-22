import Lists from "./Lists";
import TodoInput from "./TodoInput";

function Main(){
    return(
      <div className="mt-4 w-75 text-center h-auto bg-white m-auto p-4 rounded overflow-auto" style={{ maxHeight: "500px" }}>
        <TodoInput />
        <Lists />
      </div>
    )
}

export default Main;