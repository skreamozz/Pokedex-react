import {useState,useEffect} from 'react';

const usePokedex = () => {
    const [pokemon,setPokemon] = useState('');
    const [pokemonData, setPokemonData] = useState(); 
    const [waiting , setWaiting] = useState(true);
    const [error , setError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setWaiting(true);
        if(pokemon === '') return;
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
        .then((rawRes) =>rawRes.json())
        .then(resJson => {
            setPokemonData({...resJson}); 
            setWaiting(false);
        }).catch((err) => {
            setError(err);
        });



    }
    
    useEffect(() => {
        setPokemon('');
        setError('');
    },[pokemonData]);
    
    const handleChange = ({target}) => {
        setPokemon(target.value)
    }  
    return {
        pokemon,
        pokemonData,
        waiting,
        error,
        handleChange,
        handleSubmit
    } 
};

export default usePokedex;