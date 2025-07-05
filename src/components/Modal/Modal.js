import { useEffect } from "react";
import styles from "./Modal.module.css";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";

function Modal({ children, className = "", dismissFunction, ...delegated }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        dismissFunction();
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dismissFunction]);

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div className={styles.backdrop} onClick={dismissFunction}></div>
        <div className={styles.wrapper}>
          <div className={`${styles.modal} ${className}`} {...delegated}>
            {children}
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}

export default Modal;
