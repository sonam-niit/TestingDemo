import { useState } from "react";
import { apiRequest } from "./request";

function TodoInput({ onSubmit }) {
  const [text, setText] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    //Only for Test Case
    if (onSubmit) {
      await onSubmit({ title: text });setText("");
      return
    }
    const { data, response } = await apiRequest("POST", `${process.env.REACT_APP_BACKEND}/api/todo`, { title: text })
    if (response.status >= 200 && response.status <= 299) {
      setText("");
    }

  }

  return (
    <form className="input-group mb-3" onSubmit={submitHandler}>
      <input
        type="text"
        className="form-control"
        placeholder="my next goal"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        id="button-addon2"
      >
        add task
      </button>
    </form>
  )
}

export default TodoInput;