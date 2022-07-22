import Login from "./pages/Login";
import AddGhost from "./pages/dashboard/AddGhost";
import ProtectedRoute from "./pages/ProtectedRoute";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/addGhost"
          element={
            <ProtectedRoute>
              <AddGhost />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" autoClose={1000} />
    </BrowserRouter>
  );
}

export default App;
