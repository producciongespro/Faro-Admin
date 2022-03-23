import React, {useState, useEffect, useContext} from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import Tabla from './Tabla';
import enviar from '../modulos/enviar';
import loadingGif from '../assets/img/loading1.gif';
import config from '../config.json';
import MyContext from '../modulos/MyContext';

//Rutas absolutas de los API dependiendo del modo (ODP - Recursos - plantillas plan, ...)
var urlObtenerBorrados;
var urlRecuperarBorrados;
function Papelera () {     
    const [datosJson, setDatosJson ] = useState(null);
    const { user } = useContext(MyContext);


  useEffect(() => {
    //Reset de variables
    urlObtenerBorrados=config.servidor;    
    urlRecuperarBorrados=config.servidor; 

    switch (user.role) {
      case "10":
        //Recursos
        urlObtenerBorrados=urlObtenerBorrados +'obtener_recursos_borrados.php';
        urlRecuperarBorrados=urlRecuperarBorrados+'recuperar_recurso.php';
      break;
      case "11":
        console.log("Obeniendo recursos borrados ODP ");
        //ODP
        urlObtenerBorrados = urlObtenerBorrados +'obtener_odp_borrado.php';
        urlRecuperarBorrados=urlRecuperarBorrados+'recuperar_odp_borrado.php';
      break;
    
      default:
        console.log("id tipo usario fuera de ragno");        
        break;
    }
    console.log("urlObtenerBorrados",urlObtenerBorrados);
    console.log("urlRecuperarBorrados",urlRecuperarBorrados);
        
    obtenerDatos(urlObtenerBorrados);
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
      //"id_usuario": usuario.idUsuario      
      "id_usuario": user.username      
    }
    console.log("Dato a recuperar:",data);     
    enviar(urlRecuperarBorrados, data, function (resp) { 
        console.log("resp",resp);           
        alertify
        .alert( config.nombre, resp.msj, function(){
          console.log("ok");          
        });
        obtenerDatos(urlObtenerBorrados);
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
            <Tabla array={datosJson} clase="table table-dark" modo="papelera" handleRecuperarRecurso={handleRecuperarRecurso}  idTipoUsuario={user.role} />
          )
      }


</div>
    )
 }

 export default Papelera;