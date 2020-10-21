import React,{useState, useContext} from 'react';



const PokemonContext = React.createContext();


export const PokemonProvider = (props) => {
    const [pokemonSeleccionado,setPokemonSeleccionado] = useState('');

    const value = {pokemonSeleccionado,setPokemonSeleccionado};

    return <PokemonContext.Provider value={value} {...props}/>
}


export const usePokemonContext = () => {
    const context = useContext(PokemonContext);
    if(!context){
        throw new Error('no esta en el contexto adecuado');
    }

    return context;

}