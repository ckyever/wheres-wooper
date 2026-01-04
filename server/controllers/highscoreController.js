import { body, validationResult, matchedData } from "express-validator";
import { constants } from "http2";

import {
  updateEmptyHighscoreUsername,
  getTopHighscores,
  getHighscoreRankPreview,
} from "../models/highscoreModel.js";

const validateUsername = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username can't be empty")
    .isLength({ max: 20 })
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

    const result = await updateEmptyHighscoreUsername(highscoreId, username);
    if (result) {
      return res.json({ message: "Highscore username has been set" });
    } else {
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to set highscore username" });
    }
  },
];

const getHighscores = async (req, res) => {
  const { new_highscore_id } = req.query;

  try {
    let highscores = await getTopHighscores();

    if (new_highscore_id > 0) {
      console.log(highscores);
      console.log(new_highscore_id);
      const newScoreIsAHighscore = highscores.some(
        (score) => score.id == new_highscore_id
      );

      if (!newScoreIsAHighscore) {
        // Show where the current highscore is
        const newHighscorePreview = await getHighscoreRankPreview(
          new_highscore_id
        );
        if (newHighscorePreview) {
          highscores = [...highscores, ...newHighscorePreview];
        }
      }
    }

    const jsonHighscores = highscores.map((score, index) => {
      const newScore = score;

      // Need to convert BigInt into a string to send via json
      newScore.time = String(newScore.time);
      newScore.rank = score.rank ? String(score.rank) : index;
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

export { setHighscoreUsername, getHighscores };
