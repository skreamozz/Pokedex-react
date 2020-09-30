import React, {useState,useEffect} from 'react';
import {Sprite, Types, Descripcion} from './index';
import {Card,Row,Col} from 'react-bootstrap';





const Pokedex = () => {
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
    
    const handleChange = (e) => {
        setPokemon(e.target.value)
    }   

    return (
        <Row>
            <Col sm={6} lg={6} md={6} className='m-auto'>
                <Card className="mt-4">
                    <form className='card-body' onSubmit={handleSubmit}>
                        <input value={pokemon} name='pokemon' onChange={handleChange} type="text" className='form-control'/>

                        <Targeta pokemon={pokemon} pokemonData={pokemonData} error={error} waiting={waiting} />
                        
                        
                    </form>
                </Card>
            </Col>
        </Row>
    );
};


const Targeta = ({waiting = true,pokemonData,error,pokemon}) => {
    if(error !== '') return <span>pokemon inexistente.</span>
    return (
        waiting ? 
        <Spinner dibujar ={pokemon.length === 0 && pokemonData === undefined ? false : true}/>
        : <Cuerpo data={pokemonData}/>
        
    )
}

const Cuerpo = ({data}) => {
    return(
    <Card className='mt-2'>
        <Card.Header><h3>{data.name}</h3></Card.Header>
        <Card.Body>
            <Sprite spriteSrc={data.sprites || ''}/> 
            <Types types={data.types || []} />
            <Descripcion url={data.species ? data.species.url : ''}/>
        </Card.Body>
    </Card>);
}
const Spinner = ({dibujar = false}) => {
    if(!dibujar) return '';
    return (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
}




export default Pokedex;