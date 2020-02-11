import React, {useState}  from 'react';
import Inicio from './componentes/Inicio';
import Menu from './componentes/Menu';
import FormEnviarRecurso from './componentes/FormEnviarRecurso';
import VerRecursos from './componentes/VerRecursos';
import './App.css';

const componentes = [ <Inicio/>, <FormEnviarRecurso/>, <VerRecursos/>   ]

function App() {
  const [componente, setComponente] = useState(null);

  const handleCargarComponentes = (e) => {
    console.log(e.target.value);    
    setComponente( componentes[e.target.value] );
  }


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
  );
}

export default App;
