import { Router } from "express";

import {
  setHighscoreUsername,
  getHighscores,
} from "../controllers/highscoreController.js";

const highscoreRouter = Router();
highscoreRouter.get("/", getHighscores);
highscoreRouter.put("/:highscoreId/username", setHighscoreUsername);

export { highscoreRouter };
