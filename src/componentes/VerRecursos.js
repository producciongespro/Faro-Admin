import React, { useState, useEffect, useContext } from "react";
import MyContext from "../modulos/MyContext";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import Tabla from "./Tabla";
import GrupoCheck from "./GurpoCheck";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";
import obtener from "../modulos/obtener";
import filtrar from "../modulos/filtrar";
import obtenerValoresCheck from "../modulos/obtenerValoresCheck";
import enviar from "../modulos/enviar";
import config from "../config.json";

var niveles = null;
var asignatura = "Todas";
var asignaturaPrimaria = null;
var asignaturaSecundaria = null;
var programasAe = null;
var recursosAe = null;

//Json obtenido del servidor
var datosJson = null;
//json filtrado por nivel
var datosPorNivel = null;

function VerRecursos() {
  const [idNivel, setIdNivel] = useState(-1);
  //Array filtrado por nivel y materia
  const [datosFiltrados, setDatosFiltrados] = useState(null);
  //Bandera que indica que la solicitud y retorno de datos están resuletos
  const [datosListos, setDatosListos] = useState(false);
  //Bandera que se utiliza para tiempo en espera de recuperar un json cuando se ha borrado un registro
  const [esperando, setEsperando] = useState(false);
  //Objeto que alamacena los campos del registro seleccionado en edición
  const [detalleRecurso, setDetalleRecurso] = useState(null);
  //Validación form mediante Validation Hooks
  const { register, handleSubmit, errors } = useForm();
  // Context hook: DAtos globales de la aplicación
  const { usuario } = useContext(MyContext);
  //Estado para ocultar o mostrar un modal
  const [show, setShow] = useState(false);
  //cerrar modal
  const handleClose = () => setShow(false);

  async function obtenerDatos(cb) {
    datosJson = await obtener(config.servidor + "obtener_recursos.php");
    console.log("datosJson", datosJson);
    niveles = await obtener(config.servidor + "obtener_niveles.php");
    console.log("niveles", niveles);
    asignaturaPrimaria = await obtener(
      config.servidor + "obtener_tabla.php?tabla=asignaturas_primaria"
    );
    console.log("asignaturaPrimaria", asignaturaPrimaria);
    asignaturaSecundaria = await obtener(
      config.servidor + "obtener_tabla.php?tabla=asignaturas_secundaria"
    );
    console.log("asignaturaSecundaria", asignaturaSecundaria);
    programasAe = await obtener(
      config.servidor + "obtener_tabla.php?tabla=programas_ae"
    );
    console.log("programasAe", programasAe);
    recursosAe = await obtener(config.servidor + "obtener_recursos_ae.php");
    console.log("recursosAe", recursosAe);
    setDatosListos(true);
    cb();
  }

  useEffect(() => {
    //console.log("Componente montado");
    //console.log("Usuario", usuario.idUsuario);
    obtenerDatos(function () {
      //console.log("Proceso de recopilado de datos finalizado");
    });
  }, []);

  useEffect(() => {
    //console.log("esperando",esperando);
    //console.log("datosListos",datosListos);
    //console.log("Datos filtrados:", datosFiltrados);
    //console.log("Detalle recurso", detalleRecurso);
    console.log("Id nivel", idNivel);
  });

  const onSubmit = (data) => {
    //Método para acutalizar un recurso********************
    //Se agregan unos datos que no están en el form
    data.id_usuario = usuario.idUsuario;
    data.id_nivel = detalleRecurso.id_nivel;
    data.id = detalleRecurso.id;

    //Obtiene los valores de los check años;
    //Validacion si el nivel presenta año:
    if (idNivel === 2 || idNivel === 3) {
      data.anno = obtenerValoresCheck("anno");
    } else {
      data.anno = "vacio";
    }

    //Valor obtenido del data mediante Validate hook
    console.log(data);
    enviar(config.servidor + "actualizar_recurso.php", data, function (resp) {
      //CALBACK que se ejecuta una vez que termina la petición de envio al servidor
      //console.log("respueste", resp);
      //1- Cierra el modal
      handleClose();
      //2-Carga el mnsj
      alertify.alert(config.nombre, resp.msj, function () {
        //console.log("OK");
      });
      //3 - Llama nuevamente obtener datos y con un CALBACK de filtrado
      // (llama a los datos filtrados)
      obtenerDatos(function () {
        datosPorNivel = filtrar(datosJson, "id_nivel", idNivel);
        filtrarPorAsignatura();
        setEsperando(false);
      });
    });
  };
  //console.log(errors);

  const handleEliminarRecurso = (e) => {
    setEsperando(true);
    const id = e.target.dataset.origen;
    const registroBorrar = { id: id, id_usuario: usuario.idUsuario };
    console.log("data a eliminar", registroBorrar);
    alertify.confirm("¿Desea realmente eliminar el recurso?", function () {
      enviar(
        config.servidor + "eliminar_recurso.php",
        registroBorrar,
        function (resp) {
          //console.log("param",param);
          alertify.success(resp.msj);
          obtenerDatos(function () {
            //Array filtrado Por nivel
            datosPorNivel = filtrar(datosJson, "id_nivel", idNivel);
            console.log("datosPorNiveldespues de borrar: ", datosPorNivel);
            filtrarPorAsignatura();
            setEsperando(false);
          });
        }
      );
    });
  };

  const handleEditarRecurso = (e) => {
    const id = e.target.dataset.origen;
    //console.log("idItem", id);
    const tmpRecurso = filtrar(datosPorNivel, "id", id);
    //console.log("tmpRecursos", tmpRecurso[0]);
    setDetalleRecurso(tmpRecurso[0]);
    setShow(true);
  };

  const handleSeleccionarNivel = (e) => {
    let tmpIdNivel = parseInt(e.target.value);
    setIdNivel(tmpIdNivel);

    //console.log("asignaturas",asignaturas);
    //Filtra array por nivel y lo carga en el estado datosFiltrados:
    /**
     * Si el id nivel es 7 carga el json de recursos agenda estudiantil
     * caso contrario carga de la tabla recursos
     */
    if (tmpIdNivel !== 7) {
      datosPorNivel = filtrar(datosJson, "id_nivel", tmpIdNivel);
      //console.log("datosPorNivel", datosPorNivel);
      setDatosFiltrados(datosPorNivel);
    } else {
      setDatosFiltrados(recursosAe);
    }
  };

  const handleSeleccionarAsignatura = (e) => {
    asignatura = e.target.value;
    console.log("Asignatura", asignatura);
    console.log(idNivel);
    //Si el nivel es recursos agenda estudiantil
    // carga otro método de filtrado "filtrarRecursosAe"
    if (idNivel !== 7) {
      filtrarPorAsignatura();
    } else {
      filtrarRecursosAe(asignatura);
    }
  };

  const filtrarPorAsignatura = () => {
    console.log("Asignatura en filtrar nivel", asignatura);

    if (asignatura !== "Todas") {
      const tmpData = filtrar(datosPorNivel, "materia", asignatura);
      console.log("tmpData", tmpData);
      setDatosFiltrados(tmpData);
    } else {
      setDatosFiltrados(datosPorNivel);
    }
  };

  const filtrarRecursosAe = (nombrePrograma) => {
    console.log("nombrePrograma", nombrePrograma);
    //console.log("datosFiltrados", datosFiltrados);

    if (nombrePrograma !== "Todas") {
      const tmpFiltrdosAe = filtrar(
        datosFiltrados,
        "nombrePrograma",
        nombrePrograma
      );
      console.log("tmpFiltrdosAe", tmpFiltrdosAe);
      //filtra los datos por  el nombre del programa
      setDatosFiltrados(tmpFiltrdosAe);
    } else {
        //Si es "todas" carga la variable original con el json de recursos ae
      setDatosFiltrados(recursosAe);
    }
  };

  return datosListos ? (
    <React.Fragment>
      <div className="alert alert-primary" role="alert">
        Admin/Ver recursos
      </div>

      <div className="row">
        {
          //Select de NIVEL
        }
        <div className="col-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="selNivel">
                Nivel
              </label>
            </div>
            <select
              className="custom-select"
              id="selNivel"
              onChange={handleSeleccionarNivel}
            >
              <option defaultValue>Seleccione un nivel</option>
              {niveles.map((item, i) => (
                <option key={"Nivel" + i} value={item.id}>
                  {" "}
                  {item.nombreNivel}{" "}
                </option>
              ))}
            </select>
          </div>
        </div>
        {
          // Select de asignatura (materia)
        }
        <div className="col-4">
          {(idNivel === 2 || idNivel === 3 || idNivel === 7) && (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="selAsignatura">
                  {idNivel !== 7 ? (
                    <span>Asigntaura</span>
                  ) : (
                    <span>Programa</span>
                  )}
                </label>
              </div>
              <select
                className="custom-select"
                id="selAsigntaura"
                onChange={handleSeleccionarAsignatura}
              >
                <option defaultValue value="Todas">
                  Todas
                </option>
                {idNivel === 2 &&
                  asignaturaPrimaria.map((item, i) => (
                    <option key={"asignaturas" + i} value={item.nombre}>
                      {" "}
                      {item.nombre}{" "}
                    </option>
                  ))}
                {idNivel === 3 &&
                  asignaturaSecundaria.map((item, i) => (
                    <option key={"asignaturas" + i} value={item.nombre}>
                      {" "}
                      {item.nombre}{" "}
                    </option>
                  ))}
                {
                  //Agenda educativa
                  idNivel === 7 &&
                    programasAe.map((item, i) => (
                      <option
                        key={"programasAe" + i}
                        value={item.nombrePrograma}
                      >
                        {" "}
                        {item.nombrePrograma}{" "}
                      </option>
                    ))
                }
              </select>
            </div>
          )}
        </div>

        {
          // Botón Buscar
        }
      </div>
      {esperando ? (
        <Tabla
          array={datosFiltrados}
          idNivel={idNivel}
          asignatura={asignatura}
          clase="table table-striped sombreado"
          modo="visor"
        />
      ) : (
        <Tabla
          array={datosFiltrados}
          idNivel={idNivel}
          asignatura={asignatura}
          handleEliminarRecurso={handleEliminarRecurso}
          handleShow={handleEditarRecurso}
          clase="table table-striped"
          modo="visor"
        />
      )}
      {
        //MODAL
      }
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edición de registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detalleRecurso !== null && (
            <React.Fragment>
              <div className="row">
                <div className="col-12 text-center">
                  <a
                    href={detalleRecurso.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={detalleRecurso.img_educatico}
                      alt="Imagen del recurso"
                    />
                  </a>
                </div>
              </div>
              <hr />
              <form onSubmit={handleSubmit(onSubmit)}>
                {detalleRecurso.materia !== undefined && (
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      {(idNivel === 2 || idNivel === 3) && (
                        <span className="input-group-text" id="spnAsignatura">
                          Asignatura
                        </span>
                      )}
                      {idNivel === 7 && (
                        <span className="input-group-text" id="spnAsignatura">
                          Programa
                        </span>
                      )}
                    </div>
                    {(idNivel === 2 || idNivel === 3 || idNivel === 7) && (
                      <input
                        name="materia"
                        ref={register}
                        type="text"
                        className="form-control"
                        readOnly
                        defaultValue={detalleRecurso.materia}
                        aria-describedby="spnAsignatura"
                      />
                    )}
                  </div>
                )}

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="spnNombreRecurso">
                      Nombre del recurso
                    </span>
                  </div>
                  <input
                    name="nombre"
                    ref={register}
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    defaultValue={detalleRecurso.nombre}
                    aria-describedby="spnNombreRecurso"
                  />
                </div>

                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Descripción:</span>
                  </div>
                  <textarea
                    name="descripcion"
                    ref={register}
                    className="form-control"
                    defaultValue={detalleRecurso.descripcion}
                    aria-label="With textarea"
                  ></textarea>
                </div>
                <br />
                {
                  //URL
                }
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">URL</span>
                  </div>
                  <input
                    type="text"
                    name="url"
                    id="txtUrl"
                    className="form-control"
                    aria-label="Default"
                    placeholder="Escriba la dirección web del recurso en Educatico."
                    defaultValue={detalleRecurso.url}
                    ref={register({ required: true })}
                  />
                </div>
                {errors.url && <p className="error">URL requerido</p>}
                {
                  //Año por nivel
                  (idNivel === 2 || idNivel === 3) && (
                    <div className="input-group-prepend">
                      <span className="input-group-text">Año: </span>
                      &nbsp; &nbsp;
                      <GrupoCheck
                        nivel={parseInt(detalleRecurso.id_nivel)}
                        nombre="anno"
                        listaAnnos={detalleRecurso.anno}
                      />
                    </div>
                  )
                }
                <br />
                {
                  //URL IMAGEN
                }
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">URL Imagen</span>
                  </div>
                  <input
                    type="text"
                    name="img_educatico"
                    id="txtUrlImagen"
                    className="form-control"
                    aria-label="Default"
                    placeholder="Coloque la dirección web de la imagen miniatura del recurso."
                    defaultValue={detalleRecurso.img_educatico}
                    ref={register({ required: true })}
                  />
                </div>
                {errors.url && <p className="error">URL requerido</p>}

                {
                  //Apoyo educativo
                }
                <div className="pretty p-switch p-fill">
                  <input
                    type="checkbox"
                    id="chkApoyo"
                    name="apoyo"
                    defaultChecked={parseInt(detalleRecurso.apoyos)}
                    ref={register}
                  />
                  <div className="state">
                    <label>Apoyo educativo</label>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-12 text-right">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      type="submit"
                    >
                      Guardar datos <i className="far fa-save"></i>
                    </button>
                  </div>
                </div>
              </form>
            </React.Fragment>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </React.Fragment>
  ) : (
    <span>Obteniendo datos del servidor. Por favor espere...</span>
  );
}

export default VerRecursos;
