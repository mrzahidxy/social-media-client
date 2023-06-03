import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Messenger from "./pages/messenger/Messenger.jsx";
import Login from "./pages/login/Login.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/messenger"
          element={
            <RequiredAuth>
              <Messenger />
            </RequiredAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
