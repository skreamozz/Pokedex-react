import React,{useState,useEffect} from 'react';
import {Container,Row, Pagination, Col, CardDeck,Spinner} from 'react-bootstrap';
import { PokemonCard } from '../componentes'

const limitBase= 5;
const urlBase = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=' + limitBase;

const ListadoPokemon = () => {
    const [Listado,setListado] = useState({});
    const [PaginaSiguiente,setPaginaSiguiente] = useState('');
    const [PaginaAnterior,setPaginaAnterior] = useState('');
    const pedirListado = async (url) =>{
        setListado({});
        const resultado = await fetch(url);
        const lista = await resultado.json();
        setListado(lista);
    }


    useEffect(()=>{
        pedirListado(urlBase);
    },[]);
    useEffect(()=>{
        setPaginaSiguiente(Listado.next );
        setPaginaAnterior(Listado.previous);
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
    <Container className='mt-5'>
        <Row className='mt-5'>
            <Col className='mt-5' lg={10} >
                <Pagination>
                    <Pagination.First onClick={handlePrimero} disabled={!PaginaAnterior} />
                    <Pagination.Prev onClick={handleAnterior} disabled={!PaginaAnterior} />
                    <Pagination.Next onClick={handleSiguiente} disabled={!PaginaSiguiente} />
                    <Pagination.Last onClick={handleUltimo} disabled={!PaginaSiguiente}/>
                </Pagination>
                <CardDeck>
                    {
                        Listado.results ? 
                        Listado.results.map((pokemon,key) => <PokemonCard key={key} pokemon = {pokemon}/>): 
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