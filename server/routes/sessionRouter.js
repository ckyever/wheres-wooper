import { Router } from "express";

import {
  startTimer,
  stopTimer,
  cleanupSession,
} from "../controllers/sessionController.js";

const sessionRouter = Router();
sessionRouter.get("/:sessionId/start", startTimer);
sessionRouter.get("/:sessionId/stop/:targetIds", stopTimer);
sessionRouter.get("/:sessionId/clean", cleanupSession);

export { sessionRouter };
