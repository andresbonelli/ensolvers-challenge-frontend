import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useState } from "react";
import Loader from "../loader";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function login(e: any) {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { username, password });

      if (res.status === 201) {
        localStorage.setItem("access_token", res.data);
        navigate("/");
      }
    } catch (error) {
      alert("An unexpected error ocurred. Please try again later");

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
