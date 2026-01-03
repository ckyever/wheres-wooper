import { useEffect, useState } from "react";

import { convertSecondsToTimerString } from "../utils.js";

import styles from "../styles/Timer.module.css";

function Timer() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setTimer(Math.floor(elapsed / 100) / 10);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.timer}>{convertSecondsToTimerString(timer)}</div>
  );
}

export default Timer;
