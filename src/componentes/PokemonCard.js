import React ,{ useState,useEffect } from 'react';
import {Card} from 'react-bootstrap';
import {Sprite} from '../componentes'

const PokemonCard = ({pokemon}) => {
    const [pokemonData,setPokemonData] = useState();

    useEffect(()=>{
        const PedirPokemon = async () => {
            const result = await fetch(pokemon.url);
            const poke = await result.json();
            setPokemonData(poke);
         }
        PedirPokemon();
    },[pokemon]);


    return (
        pokemonData === undefined ? '':
        <Card>
            <Card.Header>
                <Card.Title>{`${pokemon.name} #${pokemonData.id || ''}`}</Card.Title>
            </Card.Header>


            <Card.Body className='p-1'>
                <Sprite spriteSrc={pokemonData.sprites || ''}/>
            </Card.Body>
        </Card>
    );
};

export default PokemonCard;