import { constants } from "http2";

import { isValidHighscore } from "./highscoreController.js";
import { insertHighscore } from "../models/highscoreModel.js";
import {
  updateSessionStartTime,
  getSessionById,
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
  const { sessionId, targetIds } = req.params;

  const endTime = new Date();
  const session = await getSessionById(sessionId);

  if (session) {
    if (!areTargetIdsMatching(session.target_ids, targetIds)) {
      return res
        .status(constants.HTTP_STATUS_UNAUTHORIZED)
        .json({ message: "You are not authorised to stop this session timer" });
    }

    const timeElapsedInMs = endTime - session.start_time;
    const message = session.count
      ? "Timer has been stopped"
      : "Timer has already been stopped";

    try {
      deleteSession(sessionId);
    } catch (error) {
      console.error(error);
    }

    const isNewHighscore = await isValidHighscore(timeElapsedInMs);
    let newHighscore;
    if (isNewHighscore) {
      try {
        newHighscore = await insertHighscore(timeElapsedInMs);
      } catch (error) {
        console.error(error);
      }
    }

    return res.json({
      message: message,
      time: timeElapsedInMs,
      isValidHighscore: isNewHighscore,
      highscoreId: newHighscore ? newHighscore.id : null,
    });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to find session" });
  }
};

const sortString = (string) => {
  return string.split("").sort().join("");
};

const areTargetIdsMatching = (sessionTargetIds, userTargetIds) => {
  return sortString(sessionTargetIds) === sortString(userTargetIds);
};

const cleanupSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = deleteSession(sessionId);

    if (session) {
      return res.json({ message: "Successfully cleaned up session" });
    } else {
      return res.json({ message: "Session has already been cleaned up" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to clean up session" });
  }
};

export { startTimer, stopTimer, cleanupSession };
