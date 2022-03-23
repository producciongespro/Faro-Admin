import React, {useState, useEffect, useContext} from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import Tabla from './Tabla';
import enviar from '../modulos/enviar';
import loadingGif from '../assets/img/loading1.gif';
import endpoints from '../endpoints';
import MyContext from '../modulos/MyContext';

//Rutas absolutas de los API dependiendo del modo (ODP - Recursos - plantillas plan, ...)
let urlObtenerBorrados;
let urlRecuperarBorrados;
function Papelera () {     
    const [datosJson, setDatosJson ] = useState(null);
    const { user } = useContext(MyContext);


  useEffect(() => {
    //Reset de variables
    urlObtenerBorrados= "";    
    urlRecuperarBorrados= ""; 

    switch (user.role) {
      case "10":
        //Recursos
        urlObtenerBorrados= endpoints.getRecursosBorrados;
        urlRecuperarBorrados= endpoints.recuperarRecursoBorrado;
      break;
      case "11":
       // console.log("Obeniendo recursos borrados ODP ");
        //ODP
        urlObtenerBorrados = endpoints.getODPBorrados;
        urlRecuperarBorrados= endpoints.recuperarODPBorrado;
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
        .alert( process.env.REACT_APP_NOMBRE, resp.msj, function(){
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
            <Tabla array={datosJson} clase="table table-dark" modo="papelera" handleRecuperarRecurso={handleRecuperarRecurso} />
          )
      }


</div>
    )
 }

 export default Papelera;