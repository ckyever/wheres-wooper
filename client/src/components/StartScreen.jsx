import Heading from "./Heading.jsx";
import Leaderboard from "./Leaderboard.jsx";

import buttonStyles from "../styles/Button.module.css";
import styles from "../styles/StartScreen.module.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function StartScreen({ isGameLoading, sessionId, setIsGameInProgress }) {
  const startGame = async () => {
    setIsGameInProgress(true);
    document.getElementById("start-dialog").close();

    const startTimerUrl = `${SERVER_URL}/session/${sessionId}/start`;
    fetch(startTimerUrl);
  };

  return (
    <>
      <dialog id="start-dialog" className={styles["start-dialog"]} open>
        <div className={styles.container}>
          <div className={styles["main-content"]}>
            <Heading />
            <p className={styles.instructions}>
              Where's Wally, but with randomly generated Pokemon.
              <br />
              Click on the Pokemon that match the 3 outlines.
              <br />
              Find them fast to earn a spot on the leaderboard!
            </p>
            {isGameLoading ? (
              <span className={styles.loading}>Game is loading...</span>
            ) : (
              <button
                className={buttonStyles["dialog-button"]}
                onClick={startGame}
              >
                Start
              </button>
            )}
          </div>
          <div className={styles["right-side"]}>
            <Leaderboard />
          </div>
        </div>
      </dialog>
    </>
  );
}

export default StartScreen;
