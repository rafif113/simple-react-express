import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../constants/API";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const loginInputHandler = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const registerBtnHandler = (event) => {
    event.preventDefault();
    let { username, email, password, confirmPassword } = registerForm;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Fill in all the form");
    } else {
      if (password !== confirmPassword) {
        alert("Password tidak sama dengan confirm password");
      } else {
        axios
          .post(`${API_URL}/user/regis`, {
            username,
            email,
            password,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const loginBtnHandler = (event) => {
    event.preventDefault();
    const { email, password } = loginForm;
    axios
      .post(`${API_URL}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        if (!res.data.token) {
          alert("Your Account not verified");
        } else {
          const { dataLogin, token } = res.data;
          console.log(dataLogin);
          localStorage.setItem("token_shutter", token);
          localStorage.setItem("user_data", JSON.stringify(dataLogin));
          dispatch({
            type: "LOGIN_USER",
            payload: dataLogin,
          });
          alert("login success");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-row justify-center mt-20 mx-40">
      <section className="flex flex-col mr-16 w-6/12">
        <h2 className="text-2xl font-semibold text-center">Login Page</h2>
        <form
          className="flex flex-col"
          onSubmit={(event) => loginBtnHandler(event)}
        >
          <input
            onChange={(event) => loginInputHandler(event)}
            name="email"
            type="text"
            className="border border-gray-400 rounded-md p-2 mt-6 focus:outline-none"
            placeholder="Email"
          />
          <input
            onChange={(event) => loginInputHandler(event)}
            name="password"
            type="password"
            className="border border-gray-400 rounded-md p-2 mt-6 focus:outline-none"
            placeholder="Password"
          />
          <button
            type="submit"
            className="mt-6 py-3 px-7 bg-blue-500 text-white rounded-lg mx-auto"
          >
            Login
          </button>
        </form>
      </section>
      <div className="border border-gray-500"></div>
      {/* Start Register Page */}
      <section className="flex flex-col w-6/12 ml-16 ">
        <h2 className="text-2xl font-semibold text-center">Register Page</h2>
        <form
          onSubmit={(event) => registerBtnHandler(event)}
          className="flex flex-col"
        >
          <input
            onChange={(event) => inputHandler(event)}
            name="username"
            type="text"
            className="border border-gray-400 rounded-md p-2 mt-6 focus:outline-none"
            placeholder="Username"
          />
          <input
            onChange={(event) => inputHandler(event)}
            name="email"
            type="text"
            className="border border-gray-400 rounded-md p-2 mt-6 focus:outline-none"
            placeholder="Email"
          />
          <input
            onChange={(event) => inputHandler(event)}
            name="password"
            type="text"
            className="border border-gray-400 rounded-md p-2 mt-6 focus:outline-none"
            placeholder="Password"
          />
          <input
            onChange={(event) => inputHandler(event)}
            name="confirmPassword"
            type="text"
            className="border border-gray-400 rounded-md p-2 mt-6 focus:outline-none"
            placeholder="Confirmation Password"
          />
          <button
            type="submit"
            className="mt-6 py-3 px-7 bg-blue-500 text-white rounded-lg mx-auto"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}

export default Auth;
