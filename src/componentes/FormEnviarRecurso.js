import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import MyContext from '../modulos/MyContext';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import GrupoCheck from './GurpoCheck';
import obtenerValoresCheck from '../modulos/obtenerValoresCheck';
import enviar from '../modulos/enviar';
import config from '../config.json';
import obtener from '../modulos/obtener';

//Arrays 
var niveles = null;
var asignaturaPrimaria = null;
var asignaturaSecundaria = null;
var programasAe = null;

export default function FormEnviarRecurso() {
  const [idNivel, setIdNivel] = useState(-1);
  const [isReady, setIsReady] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { usuario } = useContext(MyContext);


  async function obtenerDatos() {
    niveles = await obtener(config.servidor + "faro/webservices/obtener_niveles.php");
    console.log("niveles", niveles);
    asignaturaPrimaria = await obtener(config.servidor + "Faro/webservices/obtener_tabla.php?tabla=asignaturas_primaria");
    asignaturaSecundaria = await obtener(config.servidor + "Faro/webservices/obtener_tabla.php?tabla=asignaturas_secundaria");
    programasAe = await obtener(config.servidor + "Faro/webservices/obtener_tabla.php?tabla=programas_ae");
    setIsReady(true);
  }


  useEffect(() => {
    obtenerDatos();
    console.log("nivel", idNivel);

  })




  const onSubmit = data => {

    let valoresCheck = obtenerValoresCheck("anno");
    //console.log("valorescheck:", valoresCheck);    
    //console.log("nivel",idNivel);

    //En caso de niveles que no sean primaria ni secudnaria, el nivel no es requrido por lo que se 
    //fuerza a vacio para envio en BD
    if (idNivel === 1 || idNivel === 4 || idNivel === 5 || idNivel === 6 || idNivel === 7) {
      valoresCheck = "vacio"
    };


    if (valoresCheck) {
      data.anno = valoresCheck;
      data.id_usuario = usuario.idUsuario;
      console.log("data", data);
      enviar(config.servidor + "faro/webservices/registrar_recurso.php", data, function (resp) {
        alertify.alert(
          config.nombre + " " + config.version,
          resp.msj,
          function () {
            console.log("ok");
          }
        );
      });
    } else {
      alertify.alert(config.nombre, "Debe seleccionar al menos un año.");
    }

  }
  //console.log(errors);


  const seleccionarNivel = (e) => {
    setIdNivel(parseInt(e.target.value));
  }

  const handleValidarEducatico = (e) => {
    const str = e.target.value;
    //console.log("Valor obtenido", str);    
    const patt = new RegExp("www.mep.go.cr/educatico");
    const res = patt.test(str);
    //console.log("Resultado", res);          
      if (res !== true) {
        alertify
          .alert("La url del recruso debe provenir de educatico.", function () {
            console.log("Aceptar");
          });
      }    
  }




  return (

    <React.Fragment>
      <div className="alert alert-primary" role="alert">
        Admin/Agregar recursos
      </div>

      {
        !!!isReady ?
          <span>Cargando información</span>
          :


          <form onSubmit={handleSubmit(onSubmit)}>
            {
              //NIVEL: 
            }
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="selNivel">Nivel</label>
              </div>
              <select className="custom-select" name="id_nivel" ref={register} onChange={seleccionarNivel}>
                <option defaultValue value={-1} >Seleccione un nivel</option>
                {
                  niveles.map((item, i) => (
                    <option key={"nivel" + i} value={item.id}> {item.nombreNivel} </option>
                  ))
                }
              </select>
            </div>

            {
              //Año por nivel          
            }
            <GrupoCheck nivel={idNivel} nombre="anno" listaAnnos="vacio" />



            {
              //ASIGNATURA (MATERIA) POR NIVEL : 
              // Primaria y secundaria solamente y agenda estudiantil
              (idNivel === 2 || idNivel === 3 || idNivel === 7) &&
              (
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    {
                      (idNivel === 2 || idNivel === 3) && <label className="input-group-text" htmlFor="selMateria">Asignatura</label>
                    }
                    {
                      idNivel === 7 && <label className="input-group-text" htmlFor="selMateria">Programa</label>
                    }
                  </div>
                  <select className="custom-select" name="materia" id="selMateria" ref={register({ required: true })} >
                    <option defaultValue value={-1} >Seleccione la asignatura</option>
                    {
                      //Caso de primaria
                      idNivel === 2 &&
                      (
                        asignaturaPrimaria.map((item, i) => (
                          <option key={"asignatura" + i} value={item.nombre}> {item.nombre} </option>
                        ))
                      )
                    }
                    {
                      //Caso de secundaria
                      idNivel === 3 &&
                      (
                        asignaturaSecundaria.map((item, i) => (
                          <option key={"asignatura" + i} value={item.nombre}> {item.nombre} </option>
                        ))
                      )
                    }

                    {
                      //Caso de agenda estudiantil
                      idNivel === 7 &&
                      (
                        programasAe.map((item, i) => (
                          <option key={"asignatura" + i} value={item.nombrePrograma}> {item.nombrePrograma} </option>
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
            {errors.nombre && <p className="error" >Nombre requerido</p>}

            {
              //URL
            }
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" >URL</span>
              </div>
              <input
                onBlur={handleValidarEducatico}
                type="text"
                name="url"
                id="txtUrl"
                className="form-control"
                aria-label="Default"
                placeholder="Escriba la dirección web del recurso en Educatico."
                ref={register({ required: true })}
              />
            </div>
            {errors.url && <p className="error">URL requerido</p>}


            {
              //URL IMAGEN
            }
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" >URL Imagen</span>
              </div>
              <input
                type="text"
                name="img_educatico"
                id="txtUrlImagen"
                className="form-control"
                aria-label="Default"
                placeholder="Coloque la dirección web de la imagen miniatura del recurso."
                ref={register({ required: true })}
              />
            </div>
            {errors.url && <p className="error">URL requerido</p>}


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
      }

    </React.Fragment>
  );
}

