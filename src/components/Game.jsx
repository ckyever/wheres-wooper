import { compare } from "bcryptjs";

import Heading from "./Heading.jsx";
import { targetPokemon } from "../data.jsx";
import SearchArea from "./SearchArea.jsx";
import Targets from "./Targets.jsx";

import searchAreaStyles from "../styles/SearchArea.module.css";
import styles from "../styles/Game.module.css";

function Game({ pokemonList }) {
  const handlePokemonClick = async (event) => {
    for (let pokemon of targetPokemon) {
      if (await compare(event.target.id, pokemon.hash)) {
        pokemon.isFound = true;
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
