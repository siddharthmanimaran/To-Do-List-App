import React, { useState } from "react";
// import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  let history = useHistory();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    PhoneNo: "",
    password: "",
  });

  function handleUser(event) {
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

    axios
      .post("http://localhost:4000/ToDoList/signUp", userData)
      .then((res) => {
        if (res.status === 200) {
          history.push("/");

          alert(JSON.stringify(res));
        } else {
          alert("fill the form");
        }
      })
      .catch((err) => {});
    setUserData({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>Sign Up</h1>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit} action="/signUp" method="post">
          <label htmlFor="fname">First name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleUser}
            value={userData.firstName}
          />
          <br />
          <label htmlFor="lname">Last name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleUser}
            value={userData.lastName}
          />
          <br />
          <label htmlFor="userName">User name:</label>
          <input
            type="text"
            name="userName"
            onChange={handleUser}
            value={userData.userName}
          />
          <br />
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            placeholder="@mail.com"
            onChange={handleUser}
            value={userData.email}
          />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Must have 8 characters"
            onChange={handleUser}
            value={userData.password}
          />
          <br />
          <Link to="/">
            <p style={{ textAlign: "right" }}>Already have Account?</p>
          </Link>
          <button
            type="submit"
            value="Submit"
            className="formSubmit"
            onClick={handleSubmit}
          >
            <span>Sign up</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
