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
var subprogramasAe = null;

export default function FormEnviarRecurso() {
  const [idNivel, setIdNivel] = useState(-1);
  const [idPrograma, setIdPrograma] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();
  const { usuario } = useContext(MyContext);


  async function obtenerDatos() {
    niveles = await obtener(config.servidor + "obtener_niveles.php");
    //console.log("niveles", niveles);
    asignaturaPrimaria = await obtener(config.servidor + "obtener_tabla.php?tabla=asignaturas_primaria");
    asignaturaSecundaria = await obtener(config.servidor + "obtener_tabla.php?tabla=asignaturas_secundaria");
    programasAe = await obtener(config.servidor + "obtener_tabla.php?tabla=programas_ae");
    subprogramasAe = await obtener(config.servidor + "obtener_subprogramas_ae.php");
    setIsReady(true);
  }


  useEffect(() => {
    obtenerDatos();
    console.log("nivel", idNivel);

  })





  const onSubmit = data => {
    let materiaLleno = false;
    //Otiene los campos que han sido chequeados por el usuario y los alamcena en una variable
    //Luego hace el append en el obejto formdata de esa propiedad
    let valoresCheck = obtenerValoresCheck("anno");
    //console.log("valorescheck:", valoresCheck);    
    //console.log("nivel",idNivel);

    //En caso de niveles que no sean primaria ni secudnaria, el año no es requrido por lo que se 
    //fuerza a vacio para envio en BD
    if (idNivel === 1 || idNivel === 4 || idNivel === 5 || idNivel === 6 || idNivel === 7  ) {
      valoresCheck = "vacio"
    };

    console.log("************data materia", data.materia);

//Validación para estableccer materia como campo requerido en priamria y secundaria
    if (idNivel === 2 || idNivel === 3 || idNivel === 7 || idNivel === 0) {
      if (parseInt(data.materia) === -1) {
        materiaLleno = false;
      } else {
        materiaLleno = true;
      }
    }

    console.log("-----------------Validación de datos:");
    console.log("materiaLleno", materiaLleno);
    console.log("valoresCheck", valoresCheck);
    console.log("idNivel", idNivel);


    //Validación de años en caso de ser necesario    
    //if (valoresCheck && materiaLleno ) {
    if (materiaLleno ) {
      data.anno = valoresCheck;
      //Envio de la variable tabla a PHP
      // Si es agenda estudiantil (id 7) carga carga recursos de agenda estudiantil, caso contrario
      // carga recursos genérico
      if (idNivel === 7) {
        data.tabla = "recursos_ae";
      } else {
        data.tabla = "recursos";
      }

      data.id_usuario = usuario.idUsuario;
      console.log("datos a enviar al servidor:", data);

      enviar(config.servidor + "registrar_recurso.php", data, function (resp) {
        console.log("resp------------->", resp);
        alertify.alert(
          config.nombre + " " + config.version,
          resp.msj,
          function () {
            console.log("ok");
            reset();
          }
        );
      });
    } else {
      alertify.alert(config.nombre, "Debe seleccionar al menos un año y seleccionar la asignatura correspondiente.");
    }


  }
  //console.log("errores", errors);


  const handleSeleccionarNivel = (e) => {
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

  const handleSeleccionarPrograma = (e) => {
    console.log("e.target.value", e.target.value);
    setIdPrograma(e.target.value);
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
              <select 
                className="custom-select" 
                name="id_nivel"                 
                ref={register({ required: true })}
                onChange={handleSeleccionarNivel}
                >
                <option defaultValue value="" >Seleccione un nivel</option>
                <option value={0} >Varios niveles</option>
                {
                  niveles.map((item, i) => (
                    <option key={"nivel" + i} value={item.id}> {item.nombreNivel} </option>
                  ))
                }
              </select>
            </div>
            {errors.id_nivel && <p className="error" >* Nivel requerido</p>}






            {
              //ASIGNATURA (MATERIA) POR NIVEL : 
              // Primaria y secundaria solamente 
              (idNivel === 2 || idNivel === 3) &&
              (
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="selMateria">Asignatura</label>
                  </div>
                  <select
                    className="custom-select"
                    name="materia"
                    id="selMateria"
                    ref={register({ required: true })}
                  >
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


                  </select>
                </div>
              )
            }



            {
              //PROGRAMA EN ELE CASO DE AGENDA ESTUDIANTIL : 
              // solamente agenda estudiantil
              (idNivel === 7) &&
              (
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="selMateria">Programa</label>
                  </div>
                  <select
                    className="custom-select"
                    onClick={handleSeleccionarPrograma}
                    name="idPrograma"
                    id="selPrograma"
                    ref={register({ required: true })}
                  >
                    <option defaultValue value={-1} >Seleccione el programa </option>
                    {
                      programasAe.map((item, i) => (
                        <option key={"programaae" + i} value={item.idPrograma}> {item.nombrePrograma} </option>
                      ))
                    }
                  </select>
                </div>
              )
            }


            {
              //Año por nivel          
            }
            <div className="row">
              <div className="col-sm-12">
                <GrupoCheck nivel={idNivel} nombre="anno" listaAnnos="vacio" />
              </div>
            </div>


            {
              //SUBPROGRAMA: 
              (idNivel === 7 && idPrograma === "1") && (
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="selSubprograma">Subprograma</label>
                  </div>
                  <select className="custom-select"
                    id="selSubprograma"
                    name="idSubprograma"
                    ref={register}
                  >
                    <option defaultValue value={-1} >Seleccione un subprograma</option>
                    {
                      subprogramasAe.map((item, i) => (
                        <option key={"subprograma" + i} value={item.idSubprograma}> {item.nombreSubprograma} </option>
                      ))
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
            {errors.nombre && <p className="error" >* Nombre requerido</p>}

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
            {errors.url && <p className="error">* URL requerido</p>}


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
            {errors.img_educatico && <p className="error">* URL imagen requerido</p>}


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
                ref={register({ required: true })}
              />

            </div>
            {errors.descripcion && <p className="error">* Descripción requerida</p>}
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

