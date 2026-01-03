const convertMillisecondsToDurationString = (ms) => {
  const milliseconds = ms % 1000;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60));

  let durationString = "";
  if (minutes > 0) {
    durationString += `${minutes}m`;
  }

  if (seconds > 0) {
    durationString += ` ${String(seconds).padStart(2, "0")}s`;
  }

  durationString += ` ${String(milliseconds).padStart(3, "0")}ms`;

  return durationString;
};

const convertSecondsToTimerString = (sec) => {
  const milliseconds = sec.toString().at(-1);
  const seconds = Math.floor(sec) % 60;
  const minutes = Math.floor(sec / 60);

  let timerString;
  if (minutes > 0) {
    timerString = `${String(seconds).padStart(2, "0")}.${milliseconds}`;
    timerString = `${minutes}:${timerString}`;
  } else {
    timerString = `${seconds}.${milliseconds}`;
  }

  return timerString;
};

export { convertMillisecondsToDurationString, convertSecondsToTimerString };
