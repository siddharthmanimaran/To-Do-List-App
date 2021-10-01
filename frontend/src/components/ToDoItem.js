import React, { useState } from "react";

function ToDoItem(props) {
  const [strike, setStrike] = useState(false);

  function strikeText(prevItems) {
    setStrike((prevItems) => {
      return !prevItems;
    });
  }
  return (
    <div>
      <li style={{ textDecoration: strike ? "line-through" : "none" }}>
        {props.text}
      </li>
      <div>
        <button
          className="strike"
          style={{ margin: "10px" }}
          onClick={strikeText}
        >
          strike
        </button>

        <button
          className="Delete"
          onClick={() => {
            props.onChecked(props.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ToDoItem;
