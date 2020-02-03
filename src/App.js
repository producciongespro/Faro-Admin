import React from 'react';
import Menu from './componentes/Menu';
import FormEnviarRecurso from './componentes/FormEnviarRecurso';

function App() {
  return (
    <React.Fragment>
      <div className="jumbotron">
        <h1>Admin</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Menu/>
          </div>
          <div className="col-8">
            <FormEnviarRecurso/>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
}

export default App;
