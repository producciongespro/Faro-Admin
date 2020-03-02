import React, {useState, useEffect} from 'react';
import Tabla from './Tabla';
import loadingGif from '../assets/img/loading1.gif';
import config from '../config.json';

function Papelera () {     
    const [datosJson, setDatosJson ] = useState(null);

  useEffect(() => {
    obtenerDatos();
  }, [])

  async function obtenerDatos() {    
    let response = await fetch(config.servidor +'Faro/webservices/obtener_recursos_borrados.php');    
    const tmpArray = await response.json();
    setDatosJson (tmpArray);   
  }


    return (
        <div className="container contenedor-negro">

        
      <div className="alert alert-primary" role="alert">
        Admin/Papelera
      </div>
      {
          datosJson === null ?
          (
            <div className="row">
            <div className="col-12">
              <img className="img img-fluid" src={loadingGif} alt="Cargando" />
            </div>
        </div>
          ) : 
          (
            <Tabla array={datosJson} clase="table table-dark" modo="papelera"/>
          )
      }


</div>
    )
 }

 export default Papelera;