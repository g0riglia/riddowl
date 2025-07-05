import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import logo from "../../assets/logo.png";
import Button from "../Button";

function HomePage() {
  const navigate = useNavigate();

  return (
    <section className={styles.homePage}>
      <img
        src={logo}
        alt="Logo of Riddowl, rapresenting a cartoonish owl."
        className={styles.logo}
      />
      <h1>Riddowl</h1>
      <p>Ready to crack the mystery?</p>
      <Button
        primary={true}
        className={styles.button}
        onClick={() =>
          navigate("/main-game", { state: { generateNewRiddle: true } })
        }
      >
        Generate Riddle
      </Button>
    </section>
  );
}

export default HomePage;
