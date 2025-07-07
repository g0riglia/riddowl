import styles from "./DifficultySelector.module.css";
import Button from "../Button";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function DifficultySelector({ selectedDifficulty, setSelectedDifficulty }) {
  return (
    <div className={styles.container}>
      <h2>Choose Difficulty:</h2>
      <div className={styles.card}>
        {DIFFICULTIES.map((difficulty) => (
          <Button
            className={selectedDifficulty === difficulty ? styles.selected : ""}
            onClick={() => setSelectedDifficulty(difficulty)}
          >
            {difficulty}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelector;
