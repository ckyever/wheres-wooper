import { hash } from "bcryptjs";
import crypto from "crypto";

const MAX_POKEDEX_NUMBER = 1025;
const NUMBER_OF_TARGET_POKEMON = 3;
const SALT_ROUNDS = 4; // Use minimum rounds since speed is the priority

const getRandomNumberInRange = (startNumber, endNumber) => {
  return (
    Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber
  );
};

const getRandomPokedexNumbers = (length) => {
  const pokedexNumbers = [];

  for (let i = 1; i <= length; i++) {
    const randomPokedexNumber = getRandomNumberInRange(1, MAX_POKEDEX_NUMBER);

    if (pokedexNumbers.includes(randomPokedexNumber)) {
      // Don't include repeats so try again
      i--;
    } else {
      pokedexNumbers.push(randomPokedexNumber);
    }
  }

  return pokedexNumbers;
};

const getPokemonList = async (req, res) => {
  const { length } = req.query;

  const pokedexNumbers = getRandomPokedexNumbers(length);

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
    })
  );

  const targets = [];
  const bucketRange = Math.floor(length / NUMBER_OF_TARGET_POKEMON);
  for (let i = 0; i < NUMBER_OF_TARGET_POKEMON; i++) {
    const startNumber = 1 + i * bucketRange;
    const endNumber = (i + 1) * bucketRange;
    const randomIndex = getRandomNumberInRange(startNumber, endNumber);
    targets.push({
      hash: await hash(pokemonList[randomIndex].id, SALT_ROUNDS),
      image: pokemonList[randomIndex].image,
      isFound: false,
    });
  }

  return res.json({ targets: targets, pokemonList: pokemonList });
};

export { getPokemonList };
