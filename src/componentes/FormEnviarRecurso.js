import React from 'react';

function FormEnviarRecurso() {
    

    return (
        <React.Fragment>
<form>
  <div className="form-group">
    <label htmlFor="txtNombre">Nombre del recurso:</label>
    <input type="text" className="form-control" id="txtNombre" name="nombreRecurso" placeholder="Nombre" />    
  </div>

  <div className="form-group">
    <label htmlFor="txtUrl">Url de educatico:</label>
    <input type="text" className="form-control" id="txtUrl" name="url" placeholder="dirección de Educatico" />    
  </div>



  <button type="submit" className="btn btn-primary">Enviar</button>
</form>
        </React.Fragment>
    )
}

export default FormEnviarRecurso;