import React, {useState }  from 'react';
import MyContext from './modulos/MyContext';
import Inicio from './componentes/Inicio';
import Papelera from './componentes/Papelera';
import Menu from './componentes/Menu';
import Encabezado from './componentes/Encabezado';
import Login from './componentes/Login';
import Bitacora from './componentes/Bitacora';
import FormEnviarRecurso from './componentes/FormEnviarRecurso';
import VerRecursos from './componentes/VerRecursos';
import ContenedorListados from './componentes/ContenedorListados';



function App() {
  const [componente, setComponente] = useState(null);   
  const [usuario, setUsuario] = useState(MyContext._currentValue.usuario);    
  const contextUsuario = { usuario, setUsuario };



  const handleCargarComponentes = (e) => {
    //console.log("Parametro COMP recibido", e.target.dataset.comp);  
    const componente = e.target.dataset.componente;
    const modo = e.target.dataset.modo;    
    
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
        setComponente(<Bitacora /> )
      break;      
      case "ContenedorListados":        
        setComponente(<ContenedorListados  modo={modo} /> )
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
            <Login />
          ) :
          (
            <AdminPanel />
          )           
        }
        </MyContext.Provider>        
      );
}

export default App;
