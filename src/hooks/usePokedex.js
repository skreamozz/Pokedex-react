import { useState, useEffect } from "react";

const usePokedex = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPokemon("");
    setError("");
  }, [pokemonData]);

  return {
    pokemon,
    pokemonData,
    waiting,
    error,
    setPokemonData,
    setWaiting,
    setPokemon,
    setError,
  };
};

export default usePokedex;
