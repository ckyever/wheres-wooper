import { useEffect, useState } from "react";

const POKEMON_LIST_LENGTH = 200;

export const usePokemonList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [pokemonList, setPokemonList] = useState(null);
  const [targetPokemon, setTargetPokemon] = useState(null);

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
          newPokemon.scale = 1 + Math.min(Number(pokemon.height) * 0.08, 2);
          return newPokemon;
        });

        setSessionId(data.sessionId);
        setPokemonList(transformedData);
        setTargetPokemon(data.targets);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Something went wrong while fetching Pokemon data");
      });
  }, []);

  return { isLoading, sessionId, targetPokemon, pokemonList };
};
