import { compare } from "bcryptjs";
import { useState } from "react";

import EndScreen from "./EndScreen.jsx";
import Heading from "./Heading.jsx";
import SearchArea from "./SearchArea.jsx";
import Targets from "./Targets.jsx";
import Timer from "./Timer.jsx";

import buttonStyles from "../styles/Button.module.css";
import styles from "../styles/Game.module.css";
import searchAreaStyles from "../styles/SearchArea.module.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function Game({ isGameInProgress, sessionId, targetPokemon, pokemonList }) {
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [highscoreId, setHighscoreId] = useState(null);
  const [remainingTargets, setRemainingTargets] = useState(
    targetPokemon.length
  );
  const [targetIds, setTargetIds] = useState("");

  const handlePokemonClick = async (event) => {
    for (let pokemon of targetPokemon) {
      if (await compare(event.target.id, pokemon.hash)) {
        const newTargetIds = `${targetIds}${event.target.id}`;
        setTargetIds(newTargetIds);
        const newRemainingTargets = remainingTargets - 1;
        if (newRemainingTargets === 0) {
          const stopTimerUrl = `${SERVER_URL}/session/${sessionId}/stop/${newTargetIds}`;
          fetch(stopTimerUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to stop timer");
              }
              return response.json();
            })
            .then((data) => {
              setCompletionTime(data.time);
              if (data.isValidHighscore) {
                setHighscoreId(data.highscoreId);
              }
            })
            .catch((error) => console.error(error));
          setShowEndScreen(true);
        }
        setRemainingTargets(newRemainingTargets);

        const foundTarget = document.getElementById(pokemon.hash);
        foundTarget.className = "";
        event.target.classList.add(searchAreaStyles.found);
        return;
      }
    }
  };

  return (
    <div className={styles.game}>
      <div className={styles.sky}>
        <div className={styles.actions}>
          {!showEndScreen && (
            <button
              type="button"
              className={`${buttonStyles["dialog-button"]} ${buttonStyles.secondary}`}
              onClick={() => window.location.reload()}
            >
              Restart
            </button>
          )}
        </div>
        <Heading />
        <div className={styles.timer}>
          {isGameInProgress && !showEndScreen && <Timer />}
        </div>
        <Targets targetPokemon={targetPokemon} />
      </div>
      <div className={styles.ocean}></div>
      <div className={styles.grass}>
        <div className={styles.container}>
          <SearchArea
            pokemonList={pokemonList}
            handleClick={handlePokemonClick}
          />
        </div>
      </div>
      <EndScreen
        show={showEndScreen}
        time={completionTime}
        highscoreId={highscoreId}
      />
    </div>
  );
}

export default Game;
