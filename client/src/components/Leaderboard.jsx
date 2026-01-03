import { useHighscores } from "../data.js";
import { convertMillisecondsToDurationString } from "../utils.js";

import styles from "../styles/Leaderboard.module.css";

function Leaderboard({ currentHighscore }) {
  const { isLoading, highscores } = useHighscores();
  return (
    <>
      {isLoading ? (
        <div>Loading scores...</div>
      ) : (
        <table className={styles.leaderboard}>
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {highscores.length > 0 ? (
              highscores.map((score, index) => {
                return (
                  <tr
                    key={score.id}
                    className={
                      score.id == currentHighscore
                        ? styles["current-score"]
                        : ""
                    }
                  >
                    <td>{index + 1}.</td>
                    <td>{score.username}</td>
                    <td>
                      {convertMillisecondsToDurationString(Number(score.time))}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colspan="3">No scores yet</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Leaderboard;
