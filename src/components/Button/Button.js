import styles from "./Button.module.css";

function Button({ children, primary = false, className = "", ...delegated }) {
  return (
    <button
      className={`${
        primary ? styles.primaryBtn : styles.normalBtn
      } ${className}`}
      {...delegated}
    >
      {children}
    </button>
  );
}

export default Button;
