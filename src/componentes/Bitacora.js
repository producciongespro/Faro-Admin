import React, {useState, useEffect} from 'react';
import endpoints from '../endpoints';
import Tabla from '../componentes/Tabla';



function Bitacora (props) {
    const [datosJson, setDataJson ] = useState(null);

    useEffect(()=>{
    console.log("props.idTipoUsuario",props.idTipoUsuario);        
    let urlAPI=  endpoints.getBitacora+props.idTipoUsuario;        
    console.log("urlAPI", urlAPI);
        obtener(urlAPI);
    },[]);

    useEffect(()=>{
        console.log("datosJson",datosJson);        
    })

    async function obtener (urlAPI) {
        let response = await fetch(urlAPI);
        let data=  await response.json()                
        setDataJson (  data.reverse() );               
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