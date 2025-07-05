import { createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import MainGame from "./components/MainGame";
import useLocalStorage from "./hooks/useLocalStorage";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useLocalStorage("userData", "unlogged");

  return (
    <UserContext value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main-game" element={<MainGame />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
