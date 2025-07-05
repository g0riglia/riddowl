import { useState, useId, useContext } from "react";
import styles from "./LoginForm.module.css";
import Modal from "../Modal";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";

import { UserContext } from "../../App";

function LoginForm({ dismissFunction }) {
  const [isLogged, setIsLogged] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const emailId = `email-${useId()}`;
  const passwordId = `password-${useId()}`;
  const { user, setUser } = useContext(UserContext);

  function clearInputs() {
    setEmail("");
    setPassword("");
    setMessage("");
  }

  function getMessageClass(message) {
    if (message.includes("Successfully")) {
      return styles.success;
    } else if (message.includes("Logging") || message.includes("Creating")) {
      return styles.loading;
    } else {
      return styles.error;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isLogged) {
      handleLogin();
    } else {
      handleSignUp();
    }
  }

  async function handleLogin() {
    setIsLoading(true);
    setMessage("Logging in...");

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setMessage("Successfully logged in!");
        clearInputs();
        // Close modal after successful login
        setTimeout(() => {
          dismissFunction();
        }, 1500);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        let userMessage = "Login failed. Please try again.";
        if (errorCode === "auth/user-not-found") {
          userMessage = "No account found with this email.";
        } else if (errorCode === "auth/wrong-password") {
          userMessage = "Incorrect password.";
        } else if (errorCode === "auth/invalid-email") {
          userMessage = "Please enter a valid email address.";
        }
        setMessage(userMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleSignUp() {
    setIsLoading(true);
    setMessage("Creating account...");

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setMessage("Account created successfully!");
        clearInputs();
        // Close modal after successful signup
        setTimeout(() => {
          dismissFunction();
        }, 1500);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        let userMessage = "Sign up failed. Please try again.";
        if (errorCode === "auth/email-already-in-use") {
          userMessage = "An account with this email already exists.";
        } else if (errorCode === "auth/weak-password") {
          userMessage = "Password is too weak. Please use a stronger password.";
        } else if (errorCode === "auth/invalid-email") {
          userMessage = "Please enter a valid email address.";
        }
        setMessage(userMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogout() {
    setUser("unlogged");
    dismissFunction();
  }

  return (
    <Modal className={styles.modal} dismissFunction={dismissFunction}>
      <header className={styles.header}>
        {user !== "unlogged" ? (
          <h2 className={styles.loggedIn}>Logged in!</h2>
        ) : (
          <legend>{isLogged ? "Login" : "Sign Up"}</legend>
        )}
        <Button onClick={dismissFunction}>X</Button>
      </header>
      {user !== "unlogged" ? (
        <Button onClick={handleLogout}>Log out</Button>
      ) : (
        ""
      )}
      {user === "unlogged" ? (
        <>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Enter Email:</label>
            <input
              type="email"
              id={emailId}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="johndoe@example.com"
              required={true}
              disabled={isLoading}
            />
            <label>Enter Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id={passwordId}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required={true}
              pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$"
              title="Password must be at least 8 characters long and contain at least one number and one symbol"
              disabled={isLoading}
            />
            <label className={styles.showPassword}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(event) => setShowPassword(event.target.checked)}
                disabled={isLoading}
              />
              Show password
            </label>
            {message && (
              <div className={`${styles.message} ${getMessageClass(message)}`}>
                {message}
              </div>
            )}
            <Button primary={true} disabled={isLoading}>
              {isLoading ? "Loading..." : isLogged ? "Login" : "Sign up"}
            </Button>
          </form>
          <button
            className={styles.registerBtn}
            onClick={() => setIsLogged(!isLogged)}
            disabled={isLoading}
          >
            {isLogged ? (
              <>
                Don't have an account? <strong>Sign up</strong>
              </>
            ) : (
              <>
                Already have an account? <strong>Login</strong>
              </>
            )}
          </button>{" "}
        </>
      ) : (
        ""
      )}
    </Modal>
  );
}

export default LoginForm;
