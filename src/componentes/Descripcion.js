import React from 'react';
import {Card} from 'react-bootstrap';
import useDescripcion from '../hooks/useDescripcion'

const Descripcion = ({url=''}) => {
	const Desc = useDescripcion(url);
    	return (
        	<div>
            	<Card.Title className='mt-2' >Descripcion</Card.Title>
            	{Desc.map((desc,key) => (desc.language.name === 'es' ? <Card.Text key={key}>{desc.flavor_text}</Card.Text>: null))}
        	</div>
    );
};

export default Descripcion;
