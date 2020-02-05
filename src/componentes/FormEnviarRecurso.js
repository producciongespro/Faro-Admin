import React, {useState} from 'react';

const niveles = ["Prescolar", "Primaria", "Secundaria" ];







function FormEnviarRecurso() {
  const [nivel, setNivel] = useState(-1);

  const handleSelNivel = (e) => {
    console.log(e.target.value);
    setNivel(e.target.nive)
    
  }

  return (
    <React.Fragment>
      <div className="alert alert-primary" role="alert">
        Admin/Agregar recursos
      </div>
      <form>
        <div className="form-group">
          {//<label htmlFor="txtNombre">Nombre del recurso:</label>
          }
          <input type="text" className="form-control" id="txtNombre" name="nombre" placeholder="Nombre" />
        </div>

        <div className="form-group">
        {
          //<label htmlFor="txtDescripcion">Descripción del recurso:</label>
        }
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
              niveles.map((item, i)=>(
                <option key={"categoria"+i} value={i}> {item} </option>
              ))
            }
          </select>
        </div>

     
            {
              //Grupo select
            }

        <div className="form-group">
          {//<label htmlFor="txtUrl">Url de educatico:</label>
          }
          <input type="text" className="form-control" id="txtUrl" name="url" placeholder="dirección de Educatico" />
        </div>






        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </React.Fragment>
  )
}

export default FormEnviarRecurso;