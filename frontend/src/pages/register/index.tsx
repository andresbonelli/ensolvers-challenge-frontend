import { Link } from "react-router-dom";
import RegisterForm from "../../components/registerForm";

export default function Register() {
  return (
    <main className="flex flex-col justify-start place-items-center  max-w-full font-Montserrat pt-10 ">
      <h3 className=" font-MontserratSemibold text-3xl text-center  mb-10  ">
        Register to start writing notes
      </h3>
      <div id="form-container" className=" sm:w-96 max-w-screen-sm">
        <RegisterForm />
      </div>
      <div className="flex flex-row gap-5 justify-start sm:w-96 max-w-screen-sm text-sm  mt-5">
        <p className="text-sm font-medium">already an user?</p>
        <Link to="/login" className="text-blue">
          login
        </Link>
      </div>
    </main>
  );
}
