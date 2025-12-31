import { Router } from "express";

import { getPokemonList } from "../controllers/pokemonController.js";

const pokemonRouter = Router();
pokemonRouter.get("/", getPokemonList);

export { pokemonRouter };
