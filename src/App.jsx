import styles from "./styles/App.module.css";
import animatedWooper from "./assets/wooper.gif";

function App() {
  return (
    <>
      <h1 className={styles.heading}>
        <img src={animatedWooper} alt="Wooper swaying side to side" />
        Where's Wooper?
      </h1>
    </>
  );
}

export default App;
