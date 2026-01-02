import { useState } from "react";

import styles from "../styles/EndScreen.module.css";

function EndScreen({ show, time, highscoreId }) {
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // CKYTODO: Update highscoreId with username
  };

  const dialog = document.getElementById("end-screen-dialog");
  if (dialog && show) {
    dialog.showModal();
  }

  return (
    <dialog id="end-screen-dialog" className={styles["end-screen"]}>
      <div className={styles.container}>
        <p>Congrats you finished the game in {time}ms</p>

        {highscoreId && (
          <div>
            <p>You set a new highscore!</p>
            <form
              className={styles["highscore-form"]}
              onSubmit={(event) => handleSubmit(event)}
            >
              <input
                className={styles.username}
                placeholder="Enter a username"
                aria-label="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}

        <button type="button">New Game</button>
      </div>
    </dialog>
  );
}

export default EndScreen;
