import { compare } from "bcryptjs";
import { pokemonList, targetPokemon } from "../data.jsx";

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
        <div className={styles.targets}>
          <span>Catch these pokemon</span>
          <div className={styles.lineup}>
            {targetPokemon.map((pokemon) => (
              <img
                key={pokemon.hash}
                id={pokemon.hash}
                src={pokemon.image}
                className={pokemon.isFound ? "" : styles.missing}
              />
            ))}
          </div>
        </div>
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
