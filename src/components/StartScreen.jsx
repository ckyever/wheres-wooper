import Heading from "./Heading.jsx";

import styles from "../styles/StartScreen.module.css";

function StartScreen({ isGameLoading, setIsGameInProgress }) {
  const startGame = () => {
    setIsGameInProgress(true);
    document.getElementById("start-dialog").close();
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
        </div>
      </dialog>
    </>
  );
}

export default StartScreen;
