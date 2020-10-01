import React from 'react';
import {ListGroup} from 'react-bootstrap'

const Types = ({types}) => {
    
    if(types.lenght === 0) return;
    return (
        <ListGroup className='mt-2'>
            {
               types.map((li,key) => 
                    <ListGroup.Item key={key}>{li.type.name}</ListGroup.Item>
                )
            }
        </ListGroup>
    );
    
};

export default Types;