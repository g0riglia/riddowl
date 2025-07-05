import { useState, useRef, useEffect } from "react";
import styles from "./PlayerRow.module.css";
import { ReactComponent as IconEdit } from "../../assets/icon-edit.svg";
import { ReactComponent as IconDelete } from "../../assets/icon-delete.svg";
import { ReactComponent as IconConfirm } from "../../assets/icon-confirm.svg";
import Button from "../Button";

function PlayerRow({
  player,
  index,
  editMode,
  onSubtractScore,
  onAddScore,
  onDeletePlayer,
  onEditPlayerName,
}) {
  const [playerNameInput, setPlayerNameInput] = useState("");
  const inputRef = useRef();

  function handleEditName() {
    setPlayerNameInput(player.name);
  }

  useEffect(() => {
    if (playerNameInput !== "" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [playerNameInput]);

  function handleSubmit(event) {
    event.preventDefault();
    onEditPlayerName(player.id, playerNameInput);
    setPlayerNameInput("");
  }

  function getRankIcon(position) {
    switch (position) {
      case 1:
        return "👑 ";
      case 2:
        return "🥈 ";
      case 3:
        return "🥉 ";
      default:
        return "";
    }
  }

  return (
    <div className={styles.player} key={player.id}>
      {playerNameInput === "" ? (
        <p className={`${styles.name} ${index < 3 && styles.semibold}`}>
          {index + 1}. {getRankIcon(index + 1)}
          {player.name}
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={playerNameInput}
            onChange={(event) => setPlayerNameInput(event.target.value)}
            ref={inputRef}
          />
        </form>
      )}
      {!editMode ? (
        <p className={styles.score}>{player.score}</p>
      ) : (
        <div className={styles.scoreCell}>
          <Button onClick={() => onSubtractScore(player.id)}>-</Button>
          <span className={styles.score}>{player.score}</span>
          <Button onClick={() => onAddScore(player.id)}>+</Button>
        </div>
      )}
      {!editMode ? (
        <Button onClick={() => onAddScore(player.id)}>+1 Win</Button>
      ) : (
        <div className={styles.actionBtns}>
          {playerNameInput === "" ? (
            <Button className={styles.iconBtn} onClick={handleEditName}>
              <IconEdit />
            </Button>
          ) : (
            <Button className={styles.iconBtn} onClick={handleSubmit}>
              <IconConfirm />
            </Button>
          )}
          <Button
            className={styles.iconBtn}
            onClick={() => onDeletePlayer(player.id)}
          >
            <IconDelete />
          </Button>
        </div>
      )}
    </div>
  );
}

export default PlayerRow;
