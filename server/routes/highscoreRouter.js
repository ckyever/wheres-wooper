import { Router } from "express";

import {
  setHighscoreUsername,
  getAllHighscores,
} from "../controllers/highscoreController.js";

const highscoreRouter = Router();
highscoreRouter.get("/", getAllHighscores);
highscoreRouter.put("/:highscoreId/username", setHighscoreUsername);

export { highscoreRouter };
