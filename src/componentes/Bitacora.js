import React, {useState, useEffect} from 'react';
import config from '../config';
import Tabla from '../componentes/Tabla';
import filtrar from '../modulos/filtrar';

function Bitacora (props) {
    const [datosJson, setDataJson ] = useState(null);

    useEffect(()=>{
        obtener();
    },[]);

    useEffect(()=>{
        console.log("datosJson",datosJson);        
    })

    async function obtener () {
        let response = await fetch(config.servidor+"obtener_bitacora.php");                
        let tmpJson =  await response.json();
        console.log("json sin finltrar",tmpJson);
        console.log("props.idTipoUsuario",props.idTipoUsuario);
        
        
        switch (props.idTipoUsuario) {
            case 1:
                setDataJson( filtrar(tmpJson, "tabla", "Recursos") );        
            break;
            case 2:
                setDataJson( filtrar(tmpJson, "tabla", "Oferta Desarrollo") );        
            break;
            case "3":
                console.log("No disponible");
                
            break;
                
            default:
                console.log("Tipo de usuario no disponible en bitácora");                
                break;
        }


        
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