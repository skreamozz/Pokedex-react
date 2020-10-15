import React , { useState } from 'react';
import { useEffect } from 'react';
import {Card, Image,Spinner} from 'react-bootstrap';

const Sprite = ({spriteSrc}) => {
    const [sprite,setSprite] = useState();

    useEffect(()=>{
        const obtenerSprite = async () => {
            setSprite(null);
            const result = await fetch(spriteSrc.front_default);
            const raw = await result.blob();
            const img = URL.createObjectURL(raw);
            setSprite(img);


        }
        
        obtenerSprite();

    },[spriteSrc]);




    return (
        <Card border="success" >
               {sprite?
                <Image fluid className=' m-auto' src={sprite} alt='sprite' />:
                <Spinner animation='border' className='m-auto' /> }       
        </Card>
    );
};

export default Sprite;