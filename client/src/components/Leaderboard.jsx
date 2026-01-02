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
            {highscores.map((score, index) => (
              <tr>
                <td>{index + 1}.</td>
                <td>{score.username}</td>
                <td>{score.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Leaderboard;
