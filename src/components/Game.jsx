import { compare } from "bcryptjs";
import { pokemonList, targetPokemon } from "../data.jsx";

import Targets from "./Targets.jsx";

import styles from "../styles/Game.module.css";
import animatedWooper from "../assets/wooper.gif";

function Game() {
  const handleClick = async (event) => {
    for (const pokemon of targetPokemon) {
      if (await compare(event.target.id, pokemon.hash)) {
        pokemon.isFound = true;
        const foundTarget = document.getElementById(pokemon.hash);
        foundTarget.className = "";
        event.target.classList.add(styles.found);
        return;
      }
    }
  };

  return (
    <div className={styles.game}>
      <h1 className={styles.heading}>
        <img src={animatedWooper} alt="Wooper swaying side to side" />
        Where's Wooper?
      </h1>
      <div className={styles.container}>
        <Targets targetPokemon={targetPokemon} />
        <div className={styles["search-area"]}>
          {pokemonList.map((pokemon) => {
            const style = {
              transform: `rotate(${pokemon.rotation}deg) translateX(${pokemon.xTranslate}px) translateY(${pokemon.yTranslate}px) scale(${pokemon.scale})`,
            };
            return (
              <img
                key={pokemon.id}
                id={pokemon.id}
                src={pokemon.image}
                className={styles.pokemon}
                style={style}
                onClick={(event) => handleClick(event)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Game;
