import "./App.css";
import animatedWooper from "./assets/wooper.gif";

function App() {
  return (
    <>
      <h1>
        Where's Wooper?
        <img src={animatedWooper} alt="Wooper swaying side to side" />
      </h1>
    </>
  );
}

export default App;
