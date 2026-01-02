import { formatDuration, intervalToDuration } from "date-fns";

import { useHighscores } from "../data.jsx";

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
              const duration = intervalToDuration({
                start: 0,
                end: Number(score.time),
              });
              const durationString = formatDuration(duration);
              return (
                <tr key={score.id}>
                  <td>{index + 1}.</td>
                  <td>{score.username}</td>
                  <td>{durationString}</td>
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
