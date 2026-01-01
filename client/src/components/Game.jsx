import { compare } from "bcryptjs";
import { useState } from "react";

import Heading from "./Heading.jsx";
import SearchArea from "./SearchArea.jsx";
import Targets from "./Targets.jsx";

import searchAreaStyles from "../styles/SearchArea.module.css";
import styles from "../styles/Game.module.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function Game({ sessionId, targetPokemon, pokemonList }) {
  const [remainingTargets, setRemainingTargets] = useState(
    targetPokemon.length
  );

  const handlePokemonClick = async (event) => {
    for (let pokemon of targetPokemon) {
      if (await compare(event.target.id, pokemon.hash)) {
        const newRemainingTargets = remainingTargets - 1;
        if (newRemainingTargets === 0) {
          const stopTimerUrl = `${SERVER_URL}/session/${sessionId}/stop`;
          fetch(stopTimerUrl);
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
      <Heading />
      <div className={styles.container}>
        <Targets targetPokemon={targetPokemon} />
        <SearchArea
          pokemonList={pokemonList}
          handleClick={handlePokemonClick}
        />
      </div>
    </div>
  );
}

export default Game;
