import { Router } from "express";

import { startTimer, stopTimer } from "../controllers/sessionController.js";

const sessionRouter = Router();
sessionRouter.get("/:sessionId/start", startTimer);
sessionRouter.get("/:sessionId/stop/:targetIds", stopTimer);

export { sessionRouter };
