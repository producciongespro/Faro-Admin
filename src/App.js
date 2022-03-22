import React, {useState, useEffect }  from 'react';
import MyContext from './modulos/MyContext';
import Inicio from './componentes/Inicio';
import Papelera from './componentes/Papelera';
import Menu from './componentes/Menu';
import Encabezado from './componentes/Encabezado';
import Login from './componentes/Login';
import LoginSSO from './componentes/LoginSSO';
import Bitacora from './componentes/Bitacora';
import FormEnviarRecurso from './componentes/FormEnviarRecurso';
import VerRecursos from './componentes/VerRecursos';
import ContenedorListados from './componentes/ContenedorListados';

import * as ssoMEP from "sso-mep";


const handleLogin = async () => {
  const res =  await  ssoMEP.login();
  console.log(res);
}


function App() {
  const [componente, setComponente] = useState(null);   
  const [usuario, setUsuario] = useState(MyContext._currentValue.usuario);    
  const contextUsuario = { usuario, setUsuario };



  const handleCargarComponentes = (e) => {
    //console.log("Parametro COMP recibido", e.target.dataset.comp);  
    const componente = e.target.dataset.componente;
    const idCategoria = e.target.dataset.idcategoria;
    const modo = e.target.dataset.modo;

    //idCategoria: Es el tipo de DOP por ejmplo: Cursos virtuales, videoteca, etc
    //console.log("idCategoria",idCategoria);
    //Obtiene el modo relacionado on la tabla modo de IDP de acuerdo a la categoría
    //console.log("modo",modo);
    //Componente seleccionado
    //console.log("componente",componente);
    
    
    

    
    switch (componente) {
      case "Inicio":        
        setComponente(<Inicio /> )
      break;
      case "FormEnviarRecurso":        
        setComponente(<FormEnviarRecurso /> )
      break;
      case "VerRecursos":        
        setComponente(<VerRecursos /> )
      break;      
      case "Papelera":        
        setComponente(<Papelera /> )
      break;
      case "Bitacora":        
        setComponente(<Bitacora idTipoUsuario={usuario.idTipoUsuario} /> )
      break;      
      case "ContenedorListados":        
        setComponente(<ContenedorListados  modo={modo} idCategoria={idCategoria} idUsuario={usuario.idUsuario} /> )
      break;
    
      default:
        console.log("Opción en botones fuera de rango");        
        break;
    }

  }


  const AdminPanel =()=> {
    return (
      <React.Fragment>
        <Encabezado/>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Menu handleCargarComponentes={handleCargarComponentes} />
          </div>
          <div className="col-8">
            {
              componente !== null ?
              (
                componente
              ) :
              (
                <Inicio/>              
              )
                
              }          
          </div>
        </div>
      </div>
    </React.Fragment>
    )
  }


  return (    
       <MyContext.Provider value={contextUsuario}  > 

       {
        // console.log("Contexto usuario desde APP", contextUsuario.usuario )
         
       }  
  
        {                       
           contextUsuario.usuario.isAccesado !== true ?
          (
            <LoginSSO  handleLogin={handleLogin} />
          ) :
          (
            <AdminPanel />
          )           
        }
        </MyContext.Provider>        
      );
}

export default App;
