import React, { useState } from 'react';
import GrupoCheck from './GurpoCheck';
//import obtener from '../modulos/obtener';
import enviar from '../modulos/enviar';

const niveles = ["Prescolar", "Primaria", "Secundaria"];


function FormEnviarRecurso(props) {
  const [nivel, setNivel] = useState(-1);

  const handleSelNivel = (e) => {
    console.log(e.target.value);
    setNivel(e.target.value)
  }


  const obtenerValoresCheck =(nombre)=>{
    let listaAnnos = [];
    const chk  = document.getElementsByName(nombre);
    for (let index = 0; index < chk.length; index++) {
      const anno = { [chk[index].value] : chk[index].checked  }
      listaAnnos.push(anno);      
    }
    return JSON.stringify(listaAnnos);
  }

  const handleEnviar =(e)=> {
    e.preventDefault();    
    const data = {
      "anno": obtenerValoresCheck("anno"),
      "nombre": document.getElementById("txtNombre").value
    }

   enviar("http://localhost/faro/webservices/test1.php", data );   
  }


  return (
    <React.Fragment>
      <div className="alert alert-primary" role="alert">
        Admin/Agregar recursos
      </div>
      <form onSubmit={handleEnviar} id="form1" >

        <div className="form-group">
          <input type="text" className="form-control" id="txtNombre" name="nombre" placeholder="Nombre" />
        </div>

        <div className="form-group">
          <input type="text" className="form-control" id="txtDescripcion" name="descripcion" placeholder="Descripción" />
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


        <GrupoCheck nivel={nivel} nombre="anno"  />

        <div className="form-group">
          {//<label htmlFor="txtUrl">Url de educatico:</label>
          }
          <input type="text" className="form-control" id="txtUrl" name="url" placeholder="dirección de Educatico" />
        </div>






        <button type="submit"          className="btn btn-primary"  > Enviar  </button>
      </form>
    </React.Fragment>
  )
}

export default FormEnviarRecurso;