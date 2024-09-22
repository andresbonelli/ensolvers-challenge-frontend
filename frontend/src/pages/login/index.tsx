import { Link } from "react-router-dom";
import LoginForm from "../../components/loginForm";

export default function Login() {
  return (
    <main className="flex flex-col justify-start place-items-center  max-w-full font-Montserrat pt-10 ">
      <h3 className=" font-MontserratSemibold text-3xl text-center  mb-10  ">
        Welcome back!
      </h3>
      <div id="form-container" className=" sm:w-96 max-w-screen-sm">
        <LoginForm />
      </div>
      <div className="flex flex-row gap-5 justify-start sm:w-96 max-w-screen-sm text-sm  mt-5">
        <p className="text-sm font-medium">need an account?</p>
        <Link to="/register" className="text-blue">
          register
        </Link>
      </div>
    </main>
  );
}
