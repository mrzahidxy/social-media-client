import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Messenger from "./pages/messenger/Messenger.jsx";
import Login from "./pages/login/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
