import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext.tsx";
import { TodoProvider } from "./context/TodoContext.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  </AuthProvider>
);
