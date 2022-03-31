import React, {useState, useEffect, useContext} from 'react';
import endpoints from '../endpoints';
import Tabla from '../componentes/Tabla';
import MyContext from '../modulos/MyContext';



function Bitacora (props) {
    const [datosJson, setDataJson ] = useState(null);
    const { user} = useContext(MyContext); 
    console.log("USUARIO EN BITACORA >>>>>> ",user);       

    useEffect(()=>{
     
    let urlAPI=  endpoints.getBitacora+user.role;        
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