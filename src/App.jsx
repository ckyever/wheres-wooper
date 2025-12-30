import { compare } from "bcryptjs";
import { pokemonList, targetPokemon } from "./data.jsx";

import styles from "./styles/App.module.css";
import animatedWooper from "./assets/wooper.gif";

function App() {
  const handleClick = async (event) => {
    for (const pokemon of targetPokemon) {
      if (await compare(event.target.id, pokemon.hash)) {
        console.log("Found one");
        return;
      }
    }
    console.log("This isn't one of the targets bruh");
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.heading}>
        <img src={animatedWooper} alt="Wooper swaying side to side" />
        Where's Wooper?
      </h1>
      <div className={styles.container}>
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

export default App;
