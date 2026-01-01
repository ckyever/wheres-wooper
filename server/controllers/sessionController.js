import { constants } from "http2";

import {
  updateSessionEndTime,
  updateSessionStartTime,
} from "../models/sessionModel.js";

const startTimer = async (req, res) => {
  const { sessionId } = req.params;

  const session = await updateSessionStartTime(sessionId, new Date());
  if (session) {
    return res.json({ message: "Timer has been started" });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to start timer" });
  }
};

const stopTimer = async (req, res) => {
  const { sessionId } = req.params;

  const session = await updateSessionEndTime(sessionId, new Date());
  if (session) {
    return res.json({ message: "Timer has been stopped" });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to stop timer" });
  }
};

export { startTimer, stopTimer };
