import { formatDistanceToNow } from "date-fns";

import { useHighscores } from "../data.js";
import { convertMillisecondsToDurationString } from "../utils.js";

import styles from "../styles/Leaderboard.module.css";

const TOP_HIGHSCORE_LIMIT = 10;

function Leaderboard({ currentHighscore }) {
  const { isLoading, highscores } = useHighscores(currentHighscore);
  return (
    <div>
      <h2 className={styles.heading}>Leaderboard</h2>
      <div className={styles.container}>
        {isLoading ? (
          <div>Loading scores...</div>
        ) : (
          <table className={styles.leaderboard}>
            <thead>
              <tr>
                <th>#</th>
                <th>USERNAME</th>
                <th>TIME</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {highscores.length > 0 ? (
                highscores.map((score, index) => {
                  return (
                    <>
                      {index === TOP_HIGHSCORE_LIMIT &&
                        Number(score.rank) > TOP_HIGHSCORE_LIMIT && (
                          <tr key="ellipses">
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                          </tr>
                        )}
                      <tr
                        key={score.id}
                        className={
                          score.id == currentHighscore
                            ? styles["current-score"]
                            : ""
                        }
                      >
                        <td>{Number(score.rank) + 1}.</td>
                        <td>
                          <span className={styles.username}>
                            {score.username ?? "[anonymous]"}
                          </span>
                        </td>
                        <td>
                          {convertMillisecondsToDurationString(
                            Number(score.time)
                          )}
                        </td>
                        <td>
                          {formatDistanceToNow(score.date, { addSuffix: true })}
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td colspan="1000">No scores yet</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
