import { useHighscores } from "../data.js";
import { convertMillisecondsToDurationString } from "../utils.js";

function Leaderboard() {
  const { isLoading, highscores } = useHighscores();
  return (
    <>
      {isLoading ? (
        <div>Loading scores...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {highscores.map((score, index) => {
              return (
                <tr key={score.id}>
                  <td>{index + 1}.</td>
                  <td>{score.username}</td>
                  <td>
                    {convertMillisecondsToDurationString(Number(score.time))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Leaderboard;
