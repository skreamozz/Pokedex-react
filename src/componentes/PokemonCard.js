import React from 'react';
import {Card} from 'react-bootstrap';
import {Sprite} from '../componentes'

const PokemonCard = ({pokemon}) => {

    return (
        <Card>
            <Card.Header>
                <Card.Title>{`${pokemon.name} #${pokemon.id || ''}`}</Card.Title>
            </Card.Header>


            <Card.Body className='p-1'>
                <Sprite spriteSrc={pokemon.sprites || ''}/>
            </Card.Body>
        </Card>
    );
};

export default PokemonCard;