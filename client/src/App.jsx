import { useState } from "react";

import { usePokemonList } from "./data.jsx";

import Game from "./components/Game.jsx";
import StartScreen from "./components/StartScreen.jsx";

function App() {
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const { isLoading, targetPokemon, pokemonList } = usePokemonList();

  return (
    <>
      <StartScreen
        isGameLoading={isLoading}
        pokemonList={pokemonList}
        setIsGameInProgress={setIsGameInProgress}
      />
      {!isLoading && (
        <Game targetPokemon={targetPokemon} pokemonList={pokemonList} />
      )}
    </>
  );
}

export default App;
