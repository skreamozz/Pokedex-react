import React ,{ useState } from 'react';
import { useEffect } from 'react';
import {Card} from 'react-bootstrap';
import {Sprite} from '../componentes'

const PokemonCard = ({pokemon}) => {
    const [pokemonData,setPokemonData] = useState({});

    useEffect(()=>{
        const PedirPokemon = async () => {
            const result = await fetch(pokemon.url);
            const poke = await result.json();
            setPokemonData(poke);
         }
        PedirPokemon();
    },[pokemon]);


    return (
        <Card>
            <Card.Header>
                <Card.Title>{pokemon.name}</Card.Title>
            </Card.Header>
            <Card.Body className='p-1'>
                    <Sprite spriteSrc={pokemonData.sprites || ''}/>
            </Card.Body>
        </Card>
    );
};

export default PokemonCard;