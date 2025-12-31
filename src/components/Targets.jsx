import styles from "../styles/Targets.module.css";

function Targets({ targetPokemon }) {
  return (
    <div className={styles.targets}>
      <span>Catch these pokemon</span>
      <div className={styles.lineup}>
        {targetPokemon
          ? targetPokemon.map((pokemon) => (
              <img
                key={pokemon.hash}
                id={pokemon.hash}
                src={pokemon.image}
                className={pokemon.isFound ? "" : styles.missing}
              />
            ))
          : "Loading..."}
      </div>
    </div>
  );
}

export default Targets;
