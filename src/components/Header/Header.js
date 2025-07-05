import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { ReactComponent as IconUser } from "../../assets/icon-user.svg";
import Button from "../Button";

function Header({ setShowLoginForm }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo of Riddowl, rapresenting a cartoonish owl." />
        <p>Riddowl</p>
      </div>
      <Button className={styles.userBtn} onClick={() => setShowLoginForm(true)}>
        <IconUser />
      </Button>
    </header>
  );
}

export default Header;
