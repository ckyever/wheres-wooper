import styles from "../styles/SearchArea.module.css";

function SearchArea({ pokemonList, handleClick }) {
  return (
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
  );
}

export default SearchArea;
