import React, {useState}  from 'react';
import Sesion from './contexto/sesion';
import Inicio from './componentes/Inicio';
import Papelera from './componentes/Papelera';
import Menu from './componentes/Menu';
import Login from './componentes/Login';
import FormEnviarRecurso from './componentes/FormEnviarRecurso';
import VerRecursos from './componentes/VerRecursos';


const componentes = [ <Inicio/>, <FormEnviarRecurso/>, <VerRecursos/>, <Papelera /> ]

function App() {
  const [componente, setComponente] = useState(null);    
  const [usuario, setUsuario] = useState({correo:"", idUsuario:"",tipoUsuario:"", isAcesado: false});
  const valorSesion = { usuario, setUsuario };


  const handleCargarComponentes = (e) => {
    //console.log(e.target.value);    
    setComponente( componentes[e.target.value] );
  }


  const AdminPanel =()=> {
    return (
      <React.Fragment>
      <div className="jumbotron">
        <h1>Admin</h1>
      </div>
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
       <Sesion.Provider valorSesion={valorSesion}>               
        {                       
           valorSesion.usuario.isAcesado !== true ?
          (
            <Login />
          ) :
          (
            <AdminPanel />
          )           
        }
        </Sesion.Provider>        
      );
}

export default App;
