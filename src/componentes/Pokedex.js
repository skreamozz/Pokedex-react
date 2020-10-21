import React, {useEffect,useCallback} from 'react';
import {Sprite, Types, Descripcion} from './index';
import {Card,Spinner} from 'react-bootstrap';
import usePokedex from '../hooks/usePokedex';
import {usePokemonContext} from '../context/PokemonContext';
const Pokedex = () => {
    const {pokemonSeleccionado} = usePokemonContext();
    const {
        pokemon,
        pokemonData,
        error,
        waiting,
        setPokemonData,
        setWaiting,
        setPokemon,
        setError
    } = usePokedex();
    
    
    
    const pedirPokemon = useCallback(async (poke) => {
        if(poke === '') return;
        try{
            await setPokemonData();
            setWaiting(true);
            const resJSon = await fetch('https://pokeapi.co/api/v2/pokemon/' + poke.toLowerCase())
            .then(rawRes =>rawRes.json());
            setPokemonData(resJSon);
            setWaiting(false);
        }catch(err){
            setWaiting(false);
            setError(err);
        }
    },[setError,setPokemonData,setWaiting]);



    const handleChange = ({target}) => {
        setPokemon(target.value)
    }  
    const handleSubmit = async (e) => {
        e.preventDefault();   
       
        await pedirPokemon(pokemon);

    }

    useEffect(()=>{
        pedirPokemon(pokemonSeleccionado)
    },[pokemonSeleccionado,pedirPokemon]);



    return (
            
                <Card className="mt-4">
                    <form className='card-body' onSubmit={handleSubmit}>
                        <input value={pokemon} placeholder='ingrese nombre de pokemon o id' name='pokemon' onChange={handleChange} type="text" className='form-control'/>

                        {
                            !waiting ? 
                                pokemonData === undefined ?
                                    <div>{error? <span>pokemon inexistente.</span> : '' }</div>:
                                    <Cuerpo data={pokemonData}/> :
                                <Spinner animation='border' className='m-auto'  />
                        }
                        
                        
                        
                    </form>
                </Card>
        
    );
};

const Cuerpo = ({data}) => {
    return(
    <Card className='mt-2'>
        <Card.Header><h3>{data.name}</h3></Card.Header>
        <Card.Body>
            <Sprite spriteSrc={data.sprites}/> 
            <Types types={data.types} />
            <Descripcion url={data.species.url}/>
        </Card.Body>
    </Card>);
}



export default Pokedex;
