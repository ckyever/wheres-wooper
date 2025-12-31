import { hash } from "bcryptjs";
import { useEffect, useState } from "react";

const POKEMON_LIST_LENGTH = 200;

export const usePokemonList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState(null);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/pokemon?length=${POKEMON_LIST_LENGTH}`;
    fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        const transformedData = data.pokemonList.map((pokemon) => {
          const newPokemon = pokemon;
          newPokemon.rotation = Math.floor(Math.random() * 40) - 20;
          newPokemon.xTranslate = Math.floor(Math.random() * 30) - 15;
          newPokemon.yTranslate = Math.floor(Math.random() * 30) - 15;
          newPokemon.scale = Math.random() * 1.2 + 0.8;
          return newPokemon;
        });

        setPokemonList(transformedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Something went wrong while fetching Pokemon data");
      });
  }, []);

  return { isLoading, pokemonList };
};

const SALT_ROUNDS = 4;
export const targetPokemon = [
  {
    hash: await hash("194", SALT_ROUNDS),
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/194.png",
    isFound: false,
  },
  {
    hash: await hash("6", SALT_ROUNDS),
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    isFound: false,
  },
  {
    hash: await hash("129", SALT_ROUNDS),
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png",
    isFound: false,
  },
];
