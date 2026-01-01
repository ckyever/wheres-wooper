import {
  insertHighscore,
  countHighscore,
  getSlowestHighscore,
  deleteHighscore,
} from "../models/highscoreModel.js";

const HIGHSCORE_LIMIT = 20;

const isValidHighscore = async (time) => {
  const highscoreCount = await countHighscore();
  if (highscoreCount < HIGHSCORE_LIMIT) {
    return true;
  } else {
    const slowestHighscore = await getSlowestHighscore();
    if (time < slowestHighscore) {
      return true;
    }
  }

  return false;
};

export { isValidHighscore };
