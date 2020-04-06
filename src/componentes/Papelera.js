import React, {useState, useEffect, useContext} from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import Tabla from './Tabla';
import enviar from '../modulos/enviar';
import loadingGif from '../assets/img/loading1.gif';
import config from '../config.json';
import MyContext from '../modulos/MyContext';


function Papelera () {     
    const [datosJson, setDatosJson ] = useState(null);
    const { usuario } = useContext(MyContext);


  useEffect(() => {
    let urlAPI=config.servidor;
    switch (usuario.idTipoUsuario) {
      case 1:
        urlAPI = urlAPI +'obtener_recursos_borrados.php';
      break;
      case 2:
        urlAPI = urlAPI +'obtener_odp_borrado.php';
      break;
    
      default:
        console.log("id tipo usario fuera de ragno");        
        break;
    }
    obtenerDatos(urlAPI);
  }, [])

  async function obtenerDatos(urlAPI) {    
    let response = await fetch(urlAPI);    
    const tmpArray = await response.json();
    setDatosJson (tmpArray);     
  }

  const handleRecuperarRecurso =(e)=>{
    //console.log("e.target.id", e.target);
    const data = {
      "id":e.target.dataset.origen,
      "id_usuario": usuario.idUsuario
    }
    //console.log("Data",data);   
    
  enviar(config.servidor+"recuperar_recurso.php", data, function (resp) { 
        console.log("resp",resp);           
        alertify
        .alert( config.nombre, resp.msj, function(){
          console.log("ok");          
        });
        obtenerDatos();
      })
    
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
            <Tabla array={datosJson} clase="table table-dark" modo="papelera" handleRecuperarRecurso={handleRecuperarRecurso}  idTipoUsuario={usuario.idTipoUsuario} />
          )
      }


</div>
    )
 }

 export default Papelera;