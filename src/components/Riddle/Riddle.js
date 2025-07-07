import { useState, useEffect, useCallback } from "react";
import styles from "./Riddle.module.css";
import { ReactComponent as IconEyeClosed } from "../../assets/icon-eye-closed.svg";
import Button from "../Button";
import DifficultySelector from "../DifficultySelector";
import getRandomRiddle from "../../utils/getRandomRiddle";

const RIDDLE = {
  clues: [
    "I am green. I move through the forest.",
    "In winter I take my rest.",
    "I can live in every condition.",
    "I hunt my preys from very far.",
  ],
  answer: "I am a frog!",
};

function Riddle({ generateNewRiddle }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [cluesShown, setCluesShown] = useState(0);
  const [currentRiddle, setCurrentRiddle] = useState(RIDDLE);
  const [loading, setLoading] = useState(false);
  const [generateRiddle, setGenerateRiddle] = useState(generateNewRiddle);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Medium");

  const handleGenerateRiddle = useCallback(async () => {
    setLoading(true);
    try {
      const newRiddle = await getRandomRiddle(selectedDifficulty);
      setCurrentRiddle(newRiddle);
      setCluesShown(0);
      setShowAnswer(false);
    } catch (error) {
      console.error("Failed to generate riddle:", error);
      // Keep the current riddle if generation fails
    } finally {
      setLoading(false);
    }
  }, [selectedDifficulty]);

  // Use useEffect to handle the generate riddle prop
  useEffect(() => {
    if (generateRiddle) {
      setGenerateRiddle(false);
      handleGenerateRiddle();
    }
  }, [generateRiddle, handleGenerateRiddle]);

  function handleNextClue() {
    const nextClue = cluesShown + 1;
    if (nextClue === 5) {
      return;
    }
    setCluesShown(nextClue);
  }

  function handleShowAnswer() {
    setShowAnswer(true);
  }

  return (
    <section className={styles.riddleBox}>
      <h2>Guess The Riddle:</h2>
      <div className={styles.riddleCard}>
        <ul>
          {currentRiddle.clues.map((clue, index) =>
            cluesShown > index ? (
              <li key={index}>{clue}</li>
            ) : (
              <div key={index} className={styles.clue}>
                <IconEyeClosed />
              </div>
            )
          )}
        </ul>
      </div>
      <div className={styles.riddleBtns}>
        <Button
          primary={true}
          className={styles.clueBtn}
          onClick={handleNextClue}
        >
          Show Next Clue
        </Button>
        <Button
          primary={true}
          onClick={showAnswer ? handleGenerateRiddle : handleShowAnswer}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : showAnswer
            ? "Generate New Riddle"
            : "Show Answer"}
        </Button>
      </div>
      {showAnswer && (
        <>
          <h3>The Answer:</h3>
          <div className={styles.answerCard}>{currentRiddle.answer}</div>
        </>
      )}
      <DifficultySelector
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
      />
    </section>
  );
}

export default Riddle;
