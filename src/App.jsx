import { pokemonList } from "./data.jsx";

import styles from "./styles/App.module.css";
import animatedWooper from "./assets/wooper.gif";

function App() {
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
