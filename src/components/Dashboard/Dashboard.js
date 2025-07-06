import { useState, useId, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { loadDashboard, saveDashboard } from "../../utils/dashboard";
import styles from "./Dashboard.module.css";
import Button from "../Button";
import PlayerRow from "../PlayerRow";

import { UserContext } from "../../App";

function reducer(draftDashboardData, action) {
  switch (action.type) {
    case "add-score": {
      const currentPlayerIndex = draftDashboardData.findIndex(
        (player) => player.id === action.id
      );

      draftDashboardData[currentPlayerIndex].score += 1;
      draftDashboardData.sort((a, b) => b.score - a.score);
      break;
    }
    case "subtract-score": {
      const currentPlayerIndex = draftDashboardData.findIndex(
        (player) => player.id === action.id
      );

      if (draftDashboardData[currentPlayerIndex].score === 0) {
        return;
      }

      draftDashboardData[currentPlayerIndex].score -= 1;
      draftDashboardData.sort((a, b) => b.score - a.score);
      break;
    }
    case "reset-score": {
      draftDashboardData.forEach((player) => {
        player.score = 0;
      });
      break;
    }
    case "delete-player": {
      return draftDashboardData.filter((player) => player.id !== action.id);
    }
    case "add-player": {
      draftDashboardData.push({
        id: crypto.randomUUID(),
        name: action.name,
        score: 0,
      });
      break;
    }
    case "restore-data": {
      return action.data;
    }
    case "edit-player-name": {
      draftDashboardData.forEach((player) => {
        if (player.id === action.id) {
          player.name = action.newName;
        }
      });
      break;
    }
    case "load-data": {
      return action.data;
    }
  }
}

function Dashboard() {
  const [editMode, setEditMode] = useState(false);
  const [currentState, setCurrentState] = useState([]);
  const [addPlayerInput, setAddPlayerInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [dashboardData, dispatch] = useImmerReducer(reducer, []);
  const inputId = useId();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await loadDashboard(user.uid);
        dispatch({ type: "load-data", data });
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        // Initialize with empty array if loading fails
        dispatch({ type: "load-data", data: [] });
      } finally {
        setIsLoading(false);
      }
    }

    if (user?.uid) {
      loadData();
    }
  }, [user?.uid, dispatch]);

  // Auto-save when dashboard data changes (but not in edit mode)
  useEffect(() => {
    if (!editMode && dashboardData.length > 0 && user?.uid) {
      saveDashboard(user.uid, dashboardData);
    }
  }, [dashboardData, editMode, user?.uid]);

  function handleEnterEditMode() {
    setCurrentState(dashboardData);
    setEditMode(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "add-player", name: addPlayerInput });
    setAddPlayerInput("");
  }

  function handleSaveDashboard() {
    setEditMode(false);
    saveDashboard(user.uid, dashboardData);
  }

  return (
    <section className={styles.dashboard}>
      <h2>{editMode ? "Edit Dashboard:" : "Dashboard:"}</h2>
      <div className={styles.card}>
        {user === "unlogged" || dashboardData.length === 0 ? (
          <p>No participants yet. Click 'Edit Dashboard' to add players.</p>
        ) : isLoading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            <div className={styles.header}>
              <p>Players</p>
              <p>Score</p>
              <p>{editMode ? "Actions" : ""}</p>
            </div>
            <div className={styles.content}>
              {dashboardData.map((player, index) => (
                <PlayerRow
                  key={player.id}
                  player={player}
                  index={index}
                  editMode={editMode}
                  onAddScore={(id) => dispatch({ type: "add-score", id })}
                  onSubtractScore={(id) =>
                    dispatch({ type: "subtract-score", id })
                  }
                  onDeletePlayer={(id) =>
                    dispatch({ type: "delete-player", id })
                  }
                  onEditPlayerName={(id, newName) =>
                    dispatch({ type: "edit-player-name", id, newName })
                  }
                />
              ))}
            </div>
          </>
        )}
        {editMode && (
          <form onSubmit={handleSubmit} className={styles.addPlayer}>
            <label htmlFor={inputId}>Add player: </label>
            <input
              type="text"
              id={inputId}
              placeholder="e.g. John Doe"
              value={addPlayerInput}
              onChange={(event) => setAddPlayerInput(event.target.value)}
            />
            <Button>Add</Button>
          </form>
        )}
        <div className={styles.buttons}>
          {!editMode ? (
            <>
              <Button onClick={handleEnterEditMode}>Edit Dashboard</Button>
              <Button onClick={() => dispatch({ type: "reset-score" })}>
                Reset Scores
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setEditMode(false);
                  dispatch({ type: "restore-data", data: currentState });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveDashboard}>Save</Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
