import React, { useState } from 'react';
import GrupoCheck from './GurpoCheck';
import obtenerValoresCheck from '../modulos/obtenerValoresCheck';
import enviar from '../modulos/enviar';

const niveles = ["Prescolar", "Primaria", "Secundaria", "Educación intercultural", "Educación Jóvenes y adultos", "Programa Nacional de Ferias", "Programa Bandera Azul"];
const asignaturaPrimaria = ["Matemática", "Ciencias", "Español", "Estudios sociales", "Artes plásticas"];
const asignaturaSecundaria = ["Matemática", "Ciencias", "Bioogía", "Química", "Español", "Estudios sociales", "Artes plásticas"];


function FormEnviarRecurso() {
  const [nivel, setNivel] = useState(-1);

  const handleSelNivel = (e) => {
    const nivel = parseInt(e.target.value);
    console.log(e.target.value);
    setNivel(nivel);
  }

  const handleEnviar = (e) => {
    e.preventDefault();

       

    const data = {
      "anno": obtenerValoresCheck("anno"),
      "nombre": document.getElementById("txtNombre").value,      
      "id_nivel": document.getElementById("selNivel").value,
      "materia": document.getElementById("selMateria").value,
      "descripcion": document.getElementById("txtDesc").value,
      "url": document.getElementById("txtUrl").value,
      "apoyo": document.getElementById("chkApoyo").checked,
      "usuario": "pepito.campos.campos@mep.go.cr"

    }
    enviar("http://localhost/faro/webservices/test1.php", data);
  }


  return (
    <React.Fragment>
      <div className="alert alert-primary" role="alert">
        Admin/Agregar recursos
      </div>
      <form onSubmit={handleEnviar} id="form1" >

        {
          //NIVEL: 
        }
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="selNivel">Nivel</label>
          </div>
          <select onClick={handleSelNivel} className="custom-select" id="selNivel">
            <option defaultValue value={-1} >Seleccione un nivel</option>
            {
              niveles.map((item, i) => (
                <option key={"categoria" + i} value={i}> {item} </option>
              ))
            }
          </select>
        </div>

        {
          //CHECK AÑOS POR NIVEL: 
        }
        <GrupoCheck nivel={nivel} nombre="anno" />


        {
          //ASIGNATURA (MATERIA) POR NIVEL : 
          (nivel === 1 || nivel === 2) &&
          (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="selMateria">Asignatura</label>
              </div>
              <select className="custom-select" id="selMateria">
                <option defaultValue value={-1} >Seleccione la asignatura</option>
                {
                  //Caso de primaria
                  nivel === 1 &&
                  (
                    asignaturaPrimaria.map((item, i) => (
                      <option key={"asignatura" + i} value={item}> {item} </option>
                    ))
                  )
                }
                {
                  //Caso de secudnaria
                  nivel === 2 &&
                  (
                    asignaturaSecundaria.map((item, i) => (
                      <option key={"asignatura" + i} value={item}> {item} </option>
                    ))
                  )
                }
              </select>
            </div>
          )
        }



        {
          //NOMBRE: 
        }
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
          </div>
          <input type="text" className="form-control" id="txtNombre" aria-label="Default" placeholder="Escriba aquí el nombre del recurso." />
        </div>



        {
          //DESCRIPCIÓN: 
        }
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Descripción</span>
          </div>
          <textarea id="txtDesc" className="form-control" aria-label="With textarea" placeholder="Breve descripición del recurso" ></textarea>
        </div>
        <br />


        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" >URL</span>
          </div>
          <input type="text" id="txtUrl" className="form-control" aria-label="Default" placeholder="Escriba la dirección web del recurso en Educatico." />
        </div>

        <div className="pretty p-switch p-fill">
          <input type="checkbox" id="chkApoyo" />
          <div className="state">
            <label>Apoyo educativo</label>
          </div>
        </div>
        <hr />
        <button type="submit" className="btn btn-primary"  > Enviar  </button>
      </form>
    </React.Fragment>
  )
}

export default FormEnviarRecurso;