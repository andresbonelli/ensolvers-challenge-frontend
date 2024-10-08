import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useState } from "react";
import Loader from "../loader";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    try {
      await api
        .post("/auth/login", { username, password })
        .then((res) => {
          if (res.status === 201) {
            console.log("Login successful");
            localStorage.setItem("access_token", res.data);
            navigate("/");
          }
        })
        .catch(function (error) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <p
        className={`text-xs ${
          errorMessage ?? "invisible"
        } text-red text-center py-2`}
      >
        {errorMessage}
      </p>
      <form onSubmit={login} className="w-full">
        <div className="mb-5 ">
          <label
            htmlFor="username-input"
            className=" block mb-2  text-gray-900"
          >
            Username:
          </label>
          <input
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            className="block w-full p-2   bg-gray-50 focus:ring-grey focus:border-grey shadow-md "
          ></input>
        </div>
        <button
          type="submit"
          className="w-full bg-softBlue hover:bg-blue text-white text-sm font-MontserratSemibold rounded p-2 mt-5 shadow-md"
        >
          login
        </button>
      </form>
      {isLoading && (
        <div className="w-full flex flex-row justify-center mt-10 mb-5">
          <Loader />
        </div>
      )}
    </>
  );
}
