import React, {useState, useEffect} from 'react';
import config from '../config';
import Tabla from '../componentes/Tabla';

function Bitacora () {
    const [datosJson, setDataJson ] = useState(null);

    useEffect(()=>{
        obtener();
    },[]);

    async function obtener () {
        let response = await fetch(config.servidor+"obtener_bitacora.php");        
        console.log(response);
        setDataJson(await response.json());        
    }

    return (
        <React.Fragment>
                <div className="alert alert-primary" role="alert">
                    Admin/Bitácora
                </div>
                {
                    datosJson !==null ?
                    (                    
                        <Tabla array={datosJson} clase="table table-striped" modo="bitacora" />
                    ) :
                    (
                        <span>Por favor espere...</span>
                    )
                }

                
        </React.Fragment>
    )
    
}


export default Bitacora;