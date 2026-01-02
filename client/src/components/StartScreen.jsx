import Heading from "./Heading.jsx";
import Leaderboard from "./Leaderboard.jsx";

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
          <Heading />
          <p className={styles.instructions}>
            This game is Where's Wally, but with Pokemon.
            <br />
            Click on the Pokemon that match the 3 outlines.
            <br />
            Find them fast to earn a spot on the leaderboard!
          </p>
          {isGameLoading ? (
            <span>Game is loading...</span>
          ) : (
            <button onClick={startGame}>Start</button>
          )}
          <Leaderboard />
        </div>
      </dialog>
    </>
  );
}

export default StartScreen;
