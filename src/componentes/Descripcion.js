import React,{useState,useEffect} from 'react';
import {Card} from 'react-bootstrap';

const Descripcion = ({url=''}) => {
    const [Desc, setDesc ] = useState([]);
    useEffect(()=>{
        const obtenerData = () => {
            fetch(url)
            .then(res => res.json())
            .then(res => { setDesc([...res.flavor_text_entries])})
            .catch(err => {});
        }
        obtenerData();
        
    },[url]);
    
    return (
        <div>
            <Card.Title className='mt-2' >Descripcion</Card.Title>
            {Desc.map((desc,key) => (desc.language.name === 'es' ? <Card.Text key={key}>{desc.flavor_text}</Card.Text>: null))}
        </div>
    );
};

export default Descripcion;