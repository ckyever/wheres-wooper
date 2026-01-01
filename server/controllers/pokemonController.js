import { hash } from "bcryptjs";
import crypto from "crypto";

import { insertSession } from "../models/sessionModel.js";

const MAX_POKEDEX_NUMBER = 1025;
const NUMBER_OF_TARGET_POKEMON = 3;
const SALT_ROUNDS = 4; // Use minimum rounds since speed is the priority
const WOOPER_POKEDEX_NUMBER = 194; // Use minimum rounds since speed is the priority

const getRandomNumberInRange = (startNumber, endNumber) => {
  return (
    Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber
  );
};

const getRandomPokedexNumbers = (length) => {
  const pokedexNumbers = [];

  for (let i = 1; i <= length; i++) {
    const randomPokedexNumber = getRandomNumberInRange(1, MAX_POKEDEX_NUMBER);

    if (
      pokedexNumbers.includes(randomPokedexNumber) ||
      randomPokedexNumber == WOOPER_POKEDEX_NUMBER
    ) {
      // Don't include repeats or Wooper so try again
      i--;
    } else {
      pokedexNumbers.push(randomPokedexNumber);
    }
  }

  return pokedexNumbers;
};

const addPokemonToTarget = async (pokemon, targets) => {
  targets.push({
    hash: await hash(pokemon.id, SALT_ROUNDS),
    image: pokemon.image,
  });
};

const getPokemonList = async (req, res) => {
  const { length } = req.query;

  const pokedexNumbers = getRandomPokedexNumbers(length - 1);

  // Always include Wooper randomly in the list
  const wooperIndex = Math.floor(Math.random() * (length - 1));
  pokedexNumbers.splice(wooperIndex, 0, WOOPER_POKEDEX_NUMBER);

  const responses = await Promise.all(
    pokedexNumbers.map((number) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    )
  );

  const pokemonData = await Promise.all(
    responses.map((response) => response.json())
  );

  const pokemonList = [];

  // Generate a UUID instead of using it's Pokedex Number to prevent users from cheating by
  // searching for it in the DOM tree
  pokemonData.forEach((pokemon) =>
    pokemonList.push({
      id: crypto.randomUUID(),
      image: pokemon.sprites.other["official-artwork"].front_default,
      height: pokemon.height,
    })
  );

  // This will be used to validate user actually completed the game
  let targetIdString = "";

  // Always include Wooper as the first target
  const targets = [];
  await addPokemonToTarget(pokemonList[wooperIndex], targets);
  targetIdString += pokemonList[wooperIndex].id;

  const bucketRange = Math.floor(length / NUMBER_OF_TARGET_POKEMON - 1);
  for (let i = 0; i < NUMBER_OF_TARGET_POKEMON - 1; i++) {
    const startNumber = 1 + i * bucketRange;
    const endNumber = (i + 1) * bucketRange;
    const randomIndex = getRandomNumberInRange(startNumber, endNumber);
    await addPokemonToTarget(pokemonList[randomIndex], targets);
    targetIdString += pokemonList[randomIndex].id;
  }

  let session;
  try {
    session = await insertSession(targetIdString);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create a new session");
  }

  return res.json({
    sessionId: session.id,
    targets: targets,
    pokemonList: pokemonList,
  });
};

export { getPokemonList };
