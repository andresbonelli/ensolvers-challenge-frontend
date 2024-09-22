import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useState } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function registerUser() {
    api
      .post("/user/", { username, password })
      .then((res) => {
        if (res.status === 201) {
          console.log("User created");
          navigate("/login");
        } else alert("failed to register");
      })
      .catch((error) => alert(error));
  }

  return (
    <form onSubmit={registerUser} className="w-full">
      <div className="mb-5 ">
        <label htmlFor="username-input" className=" block mb-2  text-gray-900">
          Username:
        </label>
        <input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2   bg-gray-50  focus:ring-grey focus:border-grey shadow-md "
        ></input>
      </div>

      <div>
        <label
          htmlFor="password-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password:
        </label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.toLowerCase())}
          className="block w-full p-2   bg-gray-50 focus:ring-grey focus:border-grey shadow-md "
        ></input>
      </div>
      <button
        type="submit"
        className="w-full bg-softBlue hover:bg-blue text-white text-sm font-MontserratSemibold rounded p-2 mt-5 shadow-md"
      >
        register
      </button>
    </form>
  );
}
