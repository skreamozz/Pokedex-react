import {useState,useEffect} from 'react';

const useDescripcion = (url = '') => {
    const [Desc, setDesc ] = useState([]);
    useEffect(()=>{

        const obtenerData = () => {
            fetch(url)
            .then(res => res.json())
            .then(res => { setDesc([...res.flavor_text_entries])})
            .catch(err => {});
        }
        if(url ==='') return;

        obtenerData();
        
    },[url]);

    return Desc;
};

export default useDescripcion;