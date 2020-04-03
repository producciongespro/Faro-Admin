import React, {useState, useEffect} from 'react';
import config from '../config';
import Tabla from '../componentes/Tabla';
import filtrar from '../modulos/filtrar';


function Bitacora (props) {
    const [datosJson, setDataJson ] = useState(null);

    useEffect(()=>{
    let urlAPI=config.servidor+"obtener_bitacora.php?tabla=";
        switch (props.idTipoUsuario) {
            case 1:
               urlAPI = urlAPI + "recursos"
            break;
            case 2:
               urlAPI = urlAPI + "desarrollo_profesional"
            break;
            case 3:
                //TODO: ver la tabla correspondiente:
               //urlAPI = urlAPI + "planes"
               console.log("tabla no disponible");               
            break;
        
            default:
                console.log("tipo de usuario fuera de rango" );                
                break;
        }
        obtener(urlAPI);
    },[]);

    useEffect(()=>{
        console.log("datosJson",datosJson);        
    })

    async function obtener (urlAPI) {
        let response = await fetch(urlAPI);                
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