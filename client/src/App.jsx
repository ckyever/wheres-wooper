import { useState } from "react";

import { usePokemonList } from "./data.js";

import Game from "./components/Game.jsx";
import StartScreen from "./components/StartScreen.jsx";

function App() {
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const { isLoading, sessionId, targetPokemon, pokemonList } = usePokemonList();

  return (
    <>
      <StartScreen
        isGameLoading={isLoading}
        sessionId={sessionId}
        setIsGameInProgress={setIsGameInProgress}
      />
      {!isLoading && (
        <Game
          sessionId={sessionId}
          targetPokemon={targetPokemon}
          pokemonList={pokemonList}
        />
      )}
    </>
  );
}

export default App;
