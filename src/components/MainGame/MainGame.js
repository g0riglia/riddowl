import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./MainGame.module.css";
import Header from "../Header";
import Riddle from "../Riddle";
import Dashboard from "../Dashboard";
import LoginForm from "../LoginForm";

function MainGame() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const location = useLocation();
  const { generateNewRiddle } = location.state || {};

  function dismissLoginForm() {
    setShowLoginForm(false);
  }

  return (
    <div className={styles.mainGame}>
      <Header setShowLoginForm={setShowLoginForm} />
      {showLoginForm && <LoginForm dismissFunction={dismissLoginForm} />}
      <div className={styles.container}>
        <Riddle generateNewRiddle={generateNewRiddle} />
        <Dashboard />
      </div>
    </div>
  );
}

export default MainGame;
