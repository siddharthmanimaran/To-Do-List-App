import axios from "axios";
import React, { useState } from "react";
import ToDoItem from "../components/ToDoItem";

function MainPage(props) {
  const [inputText, setInputText] = useState({
    list: "",
  });
  const [items, setItems] = useState([]);
  const [savedlist, setSavedList] = useState([]);
  const userId = props.match.params.userId;
  axios
    .get("http://localhost:4000/ToDoList/savedList/" + userId)
    .then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setSavedList(res.data.result);
      } else {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      alert("no data");
    });

  function handleChange(event) {
    const { name, value } = event.target;

    setInputText((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function addItem(event) {
    event.preventDefault();
    console.log(inputText);
    console.log(userId);
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });

    axios
      .post("http://localhost:4000/ToDoList/list/" + userId, inputText)
      .then((res) => {
        if (res.status === 200) {
          alert("added successfully");
        } else {
          alert("type something");
        }
      })
      .catch((err) => {
        alert("type Something");
      });
    setInputText("");
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }
  function strikeItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          name="list"
          onChange={handleChange}
          type="text"
          value={inputText.list || ""}
          placeholder="Type here.."
        />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {savedlist.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem.list}
              onChecked={deleteItem}
              onStrike={strikeItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default MainPage;
