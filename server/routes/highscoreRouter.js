import { Router } from "express";

import { setHighscoreUsername } from "../controllers/highscoreController.js";

const highscoreRouter = Router();
highscoreRouter.put("/:highscoreId/username", setHighscoreUsername);

export { highscoreRouter };
