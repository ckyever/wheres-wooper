import { useState } from "react";

import Game from "./components/Game.jsx";
import StartScreen from "./components/StartScreen.jsx";

function App() {
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  return (
    <>
      <StartScreen
        isGameLoaded={true}
        setIsGameInProgress={setIsGameInProgress}
      />
      <Game />
    </>
  );
}

export default App;
