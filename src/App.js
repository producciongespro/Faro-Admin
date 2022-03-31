import React, {useState, useEffect, useContext }  from 'react';
import MyContext from './modulos/MyContext';
import Inicio from './componentes/Inicio';
import Papelera from './componentes/Papelera';
import Menu from './componentes/Menu';
import Encabezado from './componentes/Encabezado';
//import Login from './componentes/Login';
import LoginSSO from './componentes/LoginSSO';
import Bitacora from './componentes/Bitacora';
import FormEnviarRecurso from './componentes/FormEnviarRecurso';
import VerRecursos from './componentes/VerRecursos';
import ContenedorListados from './componentes/ContenedorListados';

import * as ssoMEP from "sso-mep";

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';





function App() {
  const [componente, setComponente] = useState(null);   
  const [user, setUser] = useState(MyContext._currentValue.user);    
  const contextUser = { user, setUser };

  //console.log("contextUser", contextUser);

  const handleLogin = async () => {
    const res =  await  ssoMEP.login();
    //console.log("res.account", res.account);
    const roleApp = await ssoMEP.getRoleApp( res.account );
    //console.log("role App", roleApp);
    const tmpUsr = {
      name: res.account.name,
      username: res.account.username,
      role: roleApp.rol,
      type: roleApp.tipo,
      token: roleApp.api_key      
    };
    setUser(tmpUsr); 
  }

  const handleCerrarSesion =()=> {

    alertify.confirm(process.env.REACT_APP_NOMBRE, "Desea salir del sistema?",
    function () {
      ssoMEP.signOut();               
    },
    function () {
        console.log("cancelado cierre de sesión");                
    });


    
  }


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
        setComponente(<Bitacora idTipoUsuario={user.role} /> )
      break;      
      case "ContenedorListados":        
        setComponente(<ContenedorListados  modo={modo} idCategoria={idCategoria} idUsuario={user.username} /> )
      break;
    
      default:
        console.log("Opción en botones fuera de rango");        
        break;
    }

  }


  const AdminPanel =()=> {
    return (
      <React.Fragment>
        <Encabezado  handleCerrarSesion={handleCerrarSesion}   />
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
          contextUser.user.role === null ? <LoginSSO  handleLogin={handleLogin} /> :  
          <MyContext.Provider value={contextUser}  > 
            <AdminPanel />        
          </MyContext.Provider>       
      );
}

export default App;
