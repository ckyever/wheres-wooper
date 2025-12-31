import animatedWooper from "../assets/wooper.gif";
import styles from "../styles/Heading.module.css";

function Heading() {
  return (
    <h1 className={styles.heading}>
      <img src={animatedWooper} alt="Wooper swaying side to side" />
      Where's Wooper?
    </h1>
  );
}

export default Heading;
