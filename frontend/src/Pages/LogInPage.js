import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function LogInPage() {
  let history = useHistory();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setUserData((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(userData);
    // axios
    //   .post("http://localhost:4000/keeper/logIn", userData)
    //   .then((res) => {
    //     console.log("response from back", res);
    //     if (res.data.success) {
    //       history.push(`/MainPage/${res.data.userDetails._id}`);
    //     } else {
    //       alert(res.data.message);
    //     }
    //   })
    //   .catch((err) => {});
    setUserData({
      userName: "",
      password: "",
    });
  }
  return (
    <div className="containerForm">
      <div className="heading">
        <h1>Log In</h1>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            name="userName"
            placeholder="userName"
            value={userData.userName}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={userData.password}
            onChange={handleChange}
          />
          <br />
          <Link to="/SignUp">
            <p style={{ textAlign: "right", textDecoration: "none" }}>
              Create New Account
            </p>
          </Link>
          <button
            type="submit"
            value="Submit"
            className="formSubmit"
            onClick={handleSubmit}
          >
            <span> Log In</span>
          </button>
        </form>
      </div>
    </div>
  );
}
