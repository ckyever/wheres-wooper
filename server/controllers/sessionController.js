import { constants } from "http2";

import { isValidHighscore } from "./highscoreController.js";
import {
  updateSessionStartTime,
  getSessionStartTime,
  deleteSession,
} from "../models/sessionModel.js";

const startTimer = async (req, res) => {
  const { sessionId } = req.params;

  const result = await updateSessionStartTime(sessionId, new Date());
  if (result) {
    const message = result.count
      ? "Timer has been started"
      : "Timer has already been started";
    return res.json({ message: message });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to start timer" });
  }
};

const stopTimer = async (req, res) => {
  const { sessionId } = req.params;

  const endTime = new Date();
  const result = await getSessionStartTime(sessionId);

  if (result) {
    const timeElapsedInMs = endTime - result.start_time;
    const message = result.count
      ? "Timer has been stopped"
      : "Timer has already been stopped";

    try {
      deleteSession(sessionId);
    } catch (error) {
      console.error(error);
    }

    return res.json({
      message: message,
      time: timeElapsedInMs,
      isValidHighscore: await isValidHighscore(timeElapsedInMs),
    });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to get elapsed time" });
  }
};

export { startTimer, stopTimer };
