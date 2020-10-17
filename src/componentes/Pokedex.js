import React from 'react';
import {Sprite, Types, Descripcion} from './index';
import {Card,Spinner,Row,Col} from 'react-bootstrap';
import usePokedex from '../hooks/usePokedex';

const Pokedex = () => {
    const {
        pokemon,
        pokemonData,
        error,
        waiting,
        setPokemonData,
        setPokemon,
        setWaiting,
        setError
    } = usePokedex();
    const handleChange = ({target}) => {
        setPokemon(target.value)
    }  
    const handleSubmit = async (e) => {
        e.preventDefault();   
        if(pokemon === '') return;
        try{
            await setPokemonData();
            setWaiting(true);
            const resJSon = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.toLowerCase())
            .then(rawRes =>rawRes.json());
            setPokemonData(resJSon);
            setWaiting(false);
        }catch(err){
            setWaiting(false);
            setError(err);
        }
        




    }



    return (
        <Row className='mt-5'>
            <Col sm={6} lg={6} md={6} className='m-auto'>
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
            </Col>
        </Row>
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
