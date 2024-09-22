import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Register from "./pages/register";
import Login from "./pages/login";

import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      {/* <footer></footer> */}
    </BrowserRouter>
  );
}

export default App;
