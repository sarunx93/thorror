import Login from "./pages/Login";
import AddGhost from "./pages/dashboard/AddGhost";
import AddStory from "./pages/dashboard/AddStory";
import ProtectedRoute from "./pages/ProtectedRoute";
import Navbar from "./components/Navbar";
import SharedLayout from "./pages/dashboard/SharedLayout";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { getUserFromLocalStorage } from "./utils/localStorage";
import { logoutUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
function App() {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const dispatch = useDispatch();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        toast.warning("Login expired");
        dispatch(logoutUser());
      }
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/add-ghost" element={<AddGhost />} />
          <Route path="/dashboard/add-story" element={<AddStory />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={1000} />
    </BrowserRouter>
  );
}

export default App;
