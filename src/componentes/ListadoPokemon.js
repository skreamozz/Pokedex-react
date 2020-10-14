import React,{useState,useEffect} from 'react';

const ListadoPokemon = () => {
    const [Listado,setListado] = useState({});
    const [PaginaSiguiente,setPaginaSiguiente] = useState('');
    const [PaginaAnterior,setPaginaAnterior] = useState('');
    const pedirListado = async (url) =>{
        const resultado = await fetch(url);
        const lista = await resultado.json();
        setListado(lista);
        console.log(lista);
    }


    useEffect(()=>{
        pedirListado('https://pokeapi.co/api/v2/pokemon/');
    },[]);
    useEffect(()=>{
        setPaginaSiguiente(Listado.next || null);
        setPaginaAnterior(Listado.previous || null);
    },[Listado]);
    const handleSiguiente = (e) => {
        e.preventDefault();
        pedirListado(PaginaSiguiente);
    }
    const handleAnterior = (e) => {
        e.preventDefault();
        pedirListado(PaginaAnterior);
    }

    return (
    <>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
    <hr></hr>
        <button onClick={handleSiguiente} disabled={!PaginaSiguiente}>siguiente </button>
        <button onClick={handleAnterior} disabled={!PaginaAnterior}>anterior</button>
        <h1>pagina Anterior:{PaginaAnterior}</h1>
        <h1>pagina Siguiente:{PaginaSiguiente}</h1>
        <button onClick={handleSiguiente} disabled={!PaginaSiguiente}>siguiente </button>
        <button onClick={handleAnterior} disabled={!PaginaAnterior}>anterior</button>
    </>
    );
};

export default ListadoPokemon;