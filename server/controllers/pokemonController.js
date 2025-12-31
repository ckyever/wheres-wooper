const getPokemonList = async (req, res) => {
  return res.json({ pokemonList: ["Wooper"] });
};

export { getPokemonList };
