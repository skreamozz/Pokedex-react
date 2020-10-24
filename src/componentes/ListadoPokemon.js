import React,{useState,useEffect} from 'react';
import {CardColumns, Container,Spinner} from 'react-bootstrap';
import { PokemonCard,Paginacion } from '../componentes';
const limitBase= 6;
const urlBase = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=' + limitBase;

const ListadoPokemon = () => {
    const [Listado,setListado] = useState({});
    const [pokes, setPokes] = useState(null);
    const [offset, setOffset] = useState(0);
    const [PaginaSiguiente,setPaginaSiguiente] = useState('');
    const [PaginaAnterior,setPaginaAnterior] = useState('');
    const [PaginaActual,setPaginaActual] = useState(1);
    
    const pedirListado = async (url) =>{
        setListado({});
        setPokes(null);
        const resultado = await fetch(url);
        const lista = await resultado.json();
         setListado(lista);
    }

    const pedirPokemons = async (lista) => {
        let fetchs = [];
        const data = await lista.results.map(x => fetch(x.url).then(x => x.json()));
        await Promise.all(data).then(results => {
            fetchs = results;
        });
         setPokes(fetchs);
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
        let pagina = PaginaActual;
        let offsetTemp = offset;
        switch(name){
            case 'primero':{
                offsetTemp = 0;
                url = urlBase;
                pagina = 1;
                break;
            }
            case 'previo':{
                url = PaginaAnterior;
                --pagina;
                if(pagina <= (limitBase * offsetTemp) ) offsetTemp--
                break;
            }
            case 'siguiente':{
                url = PaginaSiguiente;
                ++pagina;
                if(pagina > (limitBase * offsetTemp) + limitBase) offsetTemp++;
                break;
            }
            case 'ultimo':{
                url = `https://pokeapi.co/api/v2/pokemon/?offset=${Listado.count - limitBase}&limit=${limitBase}`;
                pagina = Listado.count / limitBase;
                offsetTemp = (pagina / limitBase) - 1 ;
                break;
            }
            default:{
                if(pagina < 0) {
                    offsetTemp = 0;
                    pagina = 0;
                    break;
                }
                url = `https://pokeapi.co/api/v2/pokemon/?offset=${(name * limitBase) - limitBase}&limit=${limitBase}`;
                pagina = name;
                let comparador = limitBase * offsetTemp;
                if(pagina > comparador + limitBase) offsetTemp++;
                if(pagina < comparador) offsetTemp--
                break;
            }
        }
            setOffset(offsetTemp);
            setPaginaActual(pagina);
            pedirListado(url);
    }


    return (
    <Container fluid className='mt-4'>
                <Paginacion handleClick = {handlePaginacion} disabled = {(pokes? false : true)} paginaActual = {PaginaActual} maximo = {Listado.count / limitBase} limite={limitBase} offset={offset}/>               
                    <Container className='p-2 text-center'>
                        {
                            //pokes && Listado.results
                            (pokes && Listado.results)?
                            <CardColumns>
                            { 
                                pokes.map((pokemon,key) => <PokemonCard key={key} pokemonProp = {pokemon}/>)   
                            }
                        </CardColumns>:
                        <Spinner animation='border' />
                        }
                    </Container>
    </Container>
    );
};

export default ListadoPokemon;