import cors from "cors";
import express from "express";

import { highscoreRouter } from "./routes/highscoreRouter.js";
import { pokemonRouter } from "./routes/pokemonRouter.js";
import { sessionRouter } from "./routes/sessionRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/highscore", highscoreRouter);
app.use("/pokemon", pokemonRouter);
app.use("/session", sessionRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Last updated ${new Date().toISOString()}`);
});
