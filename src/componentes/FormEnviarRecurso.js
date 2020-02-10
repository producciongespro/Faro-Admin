import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import GrupoCheck from './GurpoCheck';
import obtenerValoresCheck from '../modulos/obtenerValoresCheck';
//import enviar from '../modulos/enviar';

const niveles = ["Prescolar", "Primaria", "Secundaria", "Educación intercultural", "Educación Jóvenes y adultos", "Programa Nacional de Ferias", "Programa Bandera Azul"];
const asignaturaPrimaria = ["Matemática", "Ciencias", "Español", "Estudios sociales", "Artes plásticas"];
const asignaturaSecundaria = ["Matemática", "Ciencias", "Biología", "Química", "Español", "Estudios sociales", "Artes plásticas"];

export default function FormEnviarRecurso() {
  const [nivel, setNivel] = useState(-1);
  const { register, handleSubmit, errors, getValues } = useForm();


  const onSubmit = data => {
    console.log( "Antes del append", data);
    const valorescheck = obtenerValoresCheck("anno");

    data.anno = valorescheck;

    console.log("DATA 2", data);
    
  }
  console.log(errors);


  const obtenerNivel = () => {
    setNivel(parseInt(getValues().id_nivel));
  }



  return (

    <React.Fragment>
      <div className="alert alert-primary" role="alert">
        Admin/Agregar recursos
      </div>


      <form onSubmit={handleSubmit(onSubmit)}>


        {
          //NIVEL: 
        }
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="selNivel">Nivel</label>
          </div>
          <select className="custom-select" name="id_nivel" ref={register} onChange={obtenerNivel}>
            <option defaultValue value={-1} >Seleccione un nivel</option>
            {
              niveles.map((item, i) => (
                <option key={"nivel" + i} value={i}> {item} </option>
              ))
            }
          </select>
        </div>

        {
          //Año por nivel          
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
              <select className="custom-select" name="materia" id="selMateria" ref={register({ required: true })} >
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
            <span className="input-group-text">Nombre</span>
          </div>
          <input type="text" className="form-control" name="nombre" id="txtNombre" aria-label="Default" placeholder="Escriba aquí el nombre del recurso." ref={register({ required: true, max: 32, min: 0, maxLength: 80 })} />
        </div>

        {
          //DESCRIPCIÓN: 
        }
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Descripción</span>
          </div>
          <textarea 
            id="txtDesc"
            name="descripcion" 
            className="form-control" 
            aria-label="With textarea" 
            placeholder="Breve descripición del recurso" 
            ref={register}  
          />
            
        </div>
        <br />


        {
          //URL
        }
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" >URL</span>
          </div>
          <input
            type="text"
            name="url"
            id="txtUrl"
            className="form-control"
            aria-label="Default"
            placeholder="Escriba la dirección web del recurso en Educatico."
            ref={register({ required: true })}
          />
        </div>

        {
          //Apoyo educativo
        }
        <div className="pretty p-switch p-fill">
          <input type="checkbox" 
            id="chkApoyo"
            name="apoyo" 
            ref={register}
            />
          <div className="state">
            <label>Apoyo educativo</label>
          </div>
        </div>
        <hr />
        <button type="submit" className="btn btn-primary"  > Enviar  </button>

        
      </form>

    </React.Fragment>
  );
}

