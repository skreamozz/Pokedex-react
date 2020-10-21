import React from 'react';
import {Card} from 'react-bootstrap';
import {Sprite} from '../componentes'
import { usePokemonContext } from '../context/PokemonContext'
const PokemonCard = ({pokemonProp}) => {
    const {setPokemonSeleccionado} = usePokemonContext();
    const handleClick = (e) => {
        setPokemonSeleccionado(`${pokemonProp.id}`);
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }
    return (
        <Card onClick={handleClick} className='p-1 m-2 ' >
            <Card.Header className='p-1'>
                <Card.Title>{`${pokemonProp.name} #${pokemonProp.id || ''}`}</Card.Title>
            </Card.Header>


            <Card.Body className='p-1' >
                <Sprite spriteSrc={pokemonProp.sprites || ''}/>
            </Card.Body>
        </Card>
    );
};

export default PokemonCard;