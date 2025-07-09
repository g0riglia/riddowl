import styles from "./DifficultySelector.module.css";
import Button from "../Button";

function DifficultySelector({
  difficulties,
  selectedDifficulty,
  setSelectedDifficulty,
}) {
  return (
    <div className={styles.container}>
      <h2>Choose Difficulty:</h2>
      <div className={styles.card}>
        {difficulties.map((difficulty) => (
          <Button
            className={selectedDifficulty === difficulty ? styles.selected : ""}
            onClick={() => setSelectedDifficulty(difficulty)}
            key={difficulty}
          >
            {difficulty}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelector;
