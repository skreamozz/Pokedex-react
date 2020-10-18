import React,{useState,useEffect} from 'react';
import {Container,Row, Pagination, Col, CardDeck,Spinner} from 'react-bootstrap';
import { PokemonCard } from '../componentes'

const limitBase= 5;
const urlBase = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=' + limitBase;

const ListadoPokemon = () => {
    const [Listado,setListado] = useState({});
    const [pokes, setPokes] = useState(null);
    const [PaginaSiguiente,setPaginaSiguiente] = useState('');
    const [PaginaAnterior,setPaginaAnterior] = useState('');
    
    const pedirListado = async (url) =>{
        setListado(null);
        const resultado = await fetch(url);
        const lista = await resultado.json();
        setListado(lista);
    }

    const pedirPokemons = async (lista) => {
        let fetchs = [];
        setPokes(null);
        const data = await lista.results.map(x => fetch(x.url).then(x => x.json()));
        await Promise.all(data).then(results => {
            fetchs = results;
        });
        setPokes(fetchs);
        console.log(fetchs);

    }   


    useEffect(()=>{
        pedirListado(urlBase);
    },[]);
    
    
    useEffect(()=>{
        setPaginaSiguiente(Listado.next );
        setPaginaAnterior(Listado.previous);
        if(Object.keys(Listado).length === 0) return;
        pedirPokemons(Listado);
    },[Listado]);
    
    
    const handleSiguiente = (e) => {
        e.preventDefault();
        
        pedirListado(PaginaSiguiente);
    }
    
    const handleAnterior = (e) => {
        e.preventDefault();
        
        pedirListado(PaginaAnterior);
    }
    
    const handlePrimero = (e) => {
        e.preventDefault();
        
        pedirListado(urlBase);
    }
    
    const handleUltimo = e => {
        e.preventDefault();
        pedirListado(`https://pokeapi.co/api/v2/pokemon/?offset=${Listado.count}&limit=${limitBase}`)

    }

    return (
    <Container fluid className='mt-5'>
        <Row className='mt-5'>
            <Col className='mt-5' >
                <Pagination>
                    <Pagination.First onClick={handlePrimero} disabled={!PaginaAnterior} />
                    <Pagination.Prev onClick={handleAnterior} disabled={!PaginaAnterior} />
                    <Pagination.Next onClick={handleSiguiente} disabled={!PaginaSiguiente} />
                    <Pagination.Last onClick={handleUltimo} disabled={!PaginaSiguiente}/>
                </Pagination>
                <CardDeck>
                    {
                        pokes ? 
                        pokes.map((pokemon,key) => <PokemonCard key={key} pokemon = {pokemon}/>): 
                        <Spinner animation='border' className='m-auto' />
                    }
                </CardDeck>
                <Pagination className='mt-3'>
                    <Pagination.First onClick={handlePrimero} disabled={!PaginaAnterior} />
                    <Pagination.Prev onClick={handleAnterior} disabled={!PaginaAnterior} />
                    <Pagination.Next onClick={handleSiguiente} disabled={!PaginaSiguiente} />
                    <Pagination.Last onClick={handleUltimo} disabled={!PaginaSiguiente}/>
                </Pagination>
            </Col>
        </Row>
    </Container>
    );
};

export default ListadoPokemon;