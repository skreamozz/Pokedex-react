import React from 'react';
import {Card, Image} from 'react-bootstrap';

const Sprite = ({spriteSrc}) => {
    
    if(spriteSrc === '')return spriteSrc;
    return (
        <Card border="success" >
                <Image fluid className=' m-auto' src={spriteSrc.front_default || ''} alt='sprite'/>      
        </Card>
    );
};

export default Sprite;