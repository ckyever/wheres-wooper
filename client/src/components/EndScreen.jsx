import { useState } from "react";

import Leaderboard from "./Leaderboard.jsx";
import { convertMillisecondsToDurationString } from "../utils.js";

import buttonStyles from "../styles/Button.module.css";
import styles from "../styles/EndScreen.module.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function EndScreen({ show, time, highscoreId }) {
  const [username, setUsername] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${SERVER_URL}/highscore/${highscoreId}/username`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        }
      );

      if (response.ok) {
        setShowLeaderboard(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dialog = document.getElementById("end-screen-dialog");
  if (dialog && show) {
    dialog.showModal();
  }

  return (
    <dialog id="end-screen-dialog" className={styles["end-screen"]}>
      <div className={styles.container}>
        <p>
          Congrats you finished the game in{" "}
          <span className={styles.time}>
            {convertMillisecondsToDurationString(time)}
          </span>
          !
        </p>

        {highscoreId ? (
          <div>
            {showLeaderboard ? (
              <Leaderboard currentHighscore={highscoreId} />
            ) : (
              <form
                className={styles["highscore-form"]}
                onSubmit={(event) => handleSubmit(event)}
              >
                <input
                  className={styles.username}
                  placeholder="Enter a username"
                  aria-label="username"
                  maxLength={20}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <button
                  type="submit"
                  className={`${buttonStyles["dialog-button"]} ${buttonStyles.secondary}`}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        ) : (
          <Leaderboard />
        )}

        <button
          type="button"
          className={buttonStyles["dialog-button"]}
          onClick={() => window.location.reload()}
        >
          New Game
        </button>
      </div>
    </dialog>
  );
}

export default EndScreen;
