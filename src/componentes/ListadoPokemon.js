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
        setListado({});
        setPokes(null);
        const resultado = await fetch(url);
        const lista = await resultado.json();
        await setListado(lista);
    }

    const pedirPokemons = async (lista) => {
        let fetchs = [];
        const data = await lista.results.map(x => fetch(x.url).then(x => x.json()));
        await Promise.all(data).then(results => {
            fetchs = results;
        });
        await setPokes(fetchs);
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
    

    const handlePaginacion = (name) => (e) => {
        e.preventDefault();
        let url;
        switch(name){
            case 'primero':{
                url = urlBase;
                break;
            }
            case 'previo':{
                url = PaginaAnterior;
                break;
            }
            case 'siguiente':{
                url = PaginaSiguiente;
                break;
            }
            case 'ultimo':{
                url = `https://pokeapi.co/api/v2/pokemon/?offset=${Listado.count}&limit=${limitBase}`;
                break;
            }
            default:{
                break;
            }
        }
            pedirListado(url);
    }

    

    return (
    <Container fluid className='mt-5'>
        <Row className='mt-5'>
            <Col className='mt-5' >
                <Pagination>
                    <Pagination.First onClick={handlePaginacion('primero')} disabled={!(PaginaAnterior && pokes)} />
                    <Pagination.Prev onClick={handlePaginacion('previo')} disabled={!(PaginaAnterior && pokes)} />
                    <Pagination.Next onClick={handlePaginacion('siguiente')} disabled={!(PaginaSiguiente && pokes)} />
                    <Pagination.Last onClick={handlePaginacion('ultimo')} disabled={!(PaginaSiguiente && pokes)}/>
                </Pagination>
                <CardDeck>
                    {
                        (pokes && Listado.results)? 
                        pokes.map((pokemon,key) => <PokemonCard key={key} pokemon = {pokemon}/>): 
                        <Spinner animation='border' className='m-auto' />
                    }
                </CardDeck>
                <Pagination className='mt-3'>
                    <Pagination.First onClick={handlePaginacion('primero')} disabled={!(PaginaAnterior && pokes)} />
                    <Pagination.Prev onClick={handlePaginacion('previo')} disabled={!(PaginaAnterior && pokes)} />
                    <Pagination.Next onClick={handlePaginacion('siguiente')} disabled={!(PaginaSiguiente && pokes)} />
                    <Pagination.Last onClick={handlePaginacion('ultimo')} disabled={!(PaginaSiguiente && pokes)}/>
                </Pagination>
            </Col>
        </Row>
    </Container>
    );
};

export default ListadoPokemon;