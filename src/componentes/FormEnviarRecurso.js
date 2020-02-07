import React, { useState } from 'react';
import GrupoCheck from './GurpoCheck';
import obtenerValoresCheck from '../modulos/obtenerValoresCheck';
import enviar from '../modulos/enviar';

const niveles = ["Prescolar", "Primaria", "Secundaria"];


function FormEnviarRecurso() {
  const [nivel, setNivel] = useState(-1);

  const handleSelNivel = (e) => {
    console.log(e.target.value);
    setNivel(e.target.value)
  }

  const handleEnviar = (e) => {
    e.preventDefault();
    const data = {
      "anno": obtenerValoresCheck("anno"),
      "nombre": document.getElementById("txtNombre").value
    }
    enviar("http://localhost/faro/webservices/test1.php", data);
  }


  return (
    <React.Fragment>
      <div className="alert alert-primary" role="alert">
        Admin/Agregar recursos
      </div>
      <form onSubmit={handleEnviar} id="form1" >

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
          </div>
          <input type="text" className="form-control" id="txtNombre" aria-label="Default" placeholder="Escriba aquí el nombre del recurso." />
        </div>



        <div className="form-group">
          <input type="text" className="form-control" id="txtDescripcion" name="descripcion" placeholder="Descripción" />
        </div>


        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">Nivel</label>
          </div>
          <select className="custom-select" id="inputGroupSelect01">
              <option defaultValue value={-1} >Seleccione un nivel</option>
            {
              niveles.map((item, i) => (
                <option key={"categoria" + i} value={i}> {item} </option>
              ))
            }
          </select>
        </div>





        <div className="input-group mb-3">
          <div className="input-group-prepend">
            {//<label className="input-group-text" htmlFor="selnivel">Nivel</label>
            }
          </div>
          <select onClick={handleSelNivel} className="custom-select" id="selnivel" name="id_nivel" >
            <option defaultValue value={-1} >Seleccione un nivel</option>
            {
              niveles.map((item, i) => (
                <option key={"categoria" + i} value={i}> {item} </option>
              ))
            }
          </select>
        </div>


        <GrupoCheck nivel={nivel} nombre="anno" />

        <div className="form-group">
          {//<label htmlFor="txtUrl">Url de educatico:</label>
          }
          <input type="text" className="form-control" id="txtUrl" name="url" placeholder="dirección de Educatico" />
        </div>






        <button type="submit" className="btn btn-primary"  > Enviar  </button>
      </form>
    </React.Fragment>
  )
}

export default FormEnviarRecurso;