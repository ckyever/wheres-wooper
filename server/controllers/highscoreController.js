import { body, validationResult, matchedData } from "express-validator";
import { constants } from "http2";

import {
  countHighscore,
  getSlowestHighscore,
  updateEmptyHighscoreUsername,
  getHighscores,
} from "../models/highscoreModel.js";

const HIGHSCORE_LIMIT = 10;

const isValidHighscore = async (time) => {
  const highscoreCount = await countHighscore();
  if (highscoreCount < HIGHSCORE_LIMIT) {
    return true;
  } else {
    const slowestHighscore = await getSlowestHighscore();
    if (time < slowestHighscore.time) {
      return true;
    }
  }

  return false;
};

const validateUsername = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username can't be empty")
    .isLength({ max: 50 })
    .withMessage("Username can't be more than 50 characters"),
];

const setHighscoreUsername = [
  validateUsername,
  async (req, res) => {
    const { highscoreId } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    const { username } = matchedData(req);

    const result = updateEmptyHighscoreUsername(highscoreId, username);
    if (result) {
      return res.json({ message: "Highscore username has been set" });
    } else {
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to set highscore username" });
    }
  },
];

const getAllHighscores = async (req, res) => {
  try {
    const highscores = await getHighscores();
    const jsonHighscores = highscores.map((score) => {
      const newScore = score;
      newScore.time = String(newScore.time);
      return newScore;
    });
    return res.json({ highscores: jsonHighscores });
  } catch (error) {
    console.error(error);
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Unable to get highscores" });
  }
};

export { isValidHighscore, setHighscoreUsername, getAllHighscores };
