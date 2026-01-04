import buttonStyles from "../styles/Button.module.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function RestartButton({ sessionId }) {
  const handleRestart = async () => {
    const url = `${SERVER_URL}/session/${sessionId}/clean`;
    try {
      fetch(url);
    } catch (error) {
      console.error(error);
    }

    window.location.reload();
  };

  return (
    <button
      type="button"
      className={`${buttonStyles["dialog-button"]} ${buttonStyles.secondary}`}
      onClick={() => handleRestart()}
    >
      Restart
    </button>
  );
}

export default RestartButton;
