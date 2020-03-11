import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../modulos/MyContext';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
import Tabla from './Tabla';
import GrupoCheck from './GurpoCheck';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';
import obtenerValoresCheck from '../modulos/obtenerValoresCheck';
import niveles from '../data/niveles.json';
import enviar from '../modulos/enviar';
import config from '../config.json';

var asignaturas = null;
var idNivel = null;
var asignatura = "Todas";
//Json obtenido del servidor
var datosJson = null;
//json filtrado por nivel
var datosPorNivel = null;



function VerRecursos() {
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
        datosJson = await obtener(config.servidor + "faro/webservices/obtener_recursos.php");
        //console.log("datosJson", datosJson);
        cb()
        //TODO: niveles = await obtener("http://localhost/Faro-Admin/src/data/niveles.php")        
    }


    useEffect(() => {
        console.log("Componente montado");
        //console.log("Usuario", usuario.idUsuario);        
        obtenerDatos(function () {
            setDatosListos(true);
        });
    }, []);

    useEffect(() => {
        console.log("Datos filtrados:", datosFiltrados);                 
    })

    const onSubmit = data => {
        data.id_usuario = usuario.idUsuario;
        data.id_nivel = detalleRecurso.id_nivel;
        data.id = detalleRecurso.id;
        data.anno = obtenerValoresCheck("anno");
        console.log(data);
        enviar(config.servidor + "Faro/webservices/actualizar_recurso.php", data, function (resp) {
            console.log("respueste", resp);
            handleClose();
            alertify
                .alert( config.nombre, resp.msj, function () {
                    console.log("OK");                    
                });
                obtenerDatos(function () {
                    //Array filtrado Por nivel
                    datosPorNivel = filtrar(datosJson, "id_nivel", idNivel);
                    //Asignatura
                    filtrarPorAsignatura();
                    setEsperando(false);
                });
        })
    }
    //console.log(errors);

    const handleEliminarRecurso = (e) => {
        const id = e.target.id;
        const data = { "id": id, "id_usuario": "106" };

        alertify.confirm("¿Desea realmente eliminar el recurso?",
            function () {
                enviar(config.servidor + "Faro/webservices/eliminar_recurso.php", data, function (resp) {
                    //console.log("param",param);  
                    alertify.success(resp.msj);
                    setEsperando(true);
                    obtenerDatos(function () {
                        //Array filtrado Por nivel
                        datosPorNivel = filtrar(datosJson, "id_nivel", idNivel);
                        //Asignatura
                        filtrarPorAsignatura();
                        setEsperando(false);
                    });
                })
            });
    }

    const handleEditarRecurso = (e) => {
        const id = e.target.dataset.origen;
        console.log("idItem", id);
        const tmpRecurso = filtrar(datosPorNivel, "id", id);
        console.log("tmpRecursos", tmpRecurso[0]);
        setDetalleRecurso(tmpRecurso[0]);
        setShow(true);
    }

    const handleSeleccionarNivel = (e) => {
        idNivel = parseInt(e.target.value);
        //console.log("indice nivel", idNivel);
        asignaturas = filtrar(niveles, "id", idNivel)[0].asignaturas;
        //console.log("asignaturas",asignaturas);        
        //Filtra array por nivel y lo carga en el estado datosFiltrados:
        datosPorNivel = filtrar(datosJson, "id_nivel", idNivel);
        console.log("datosPorNivel", datosPorNivel);

        setDatosFiltrados(datosPorNivel);
    }

    const handleSeleccionarAsignatura = (e) => {
        asignatura = e.target.value;
        console.log("Asignatura", asignatura);
        filtrarPorAsignatura();
    }

    const filtrarPorAsignatura = () => {
        console.log("Asignatura en filtrar nivel", asignatura);

        if (asignatura !== "Todas") {
            const tmpData = filtrar(datosPorNivel, "materia", asignatura);
            setDatosFiltrados(tmpData);
        } else {
            setDatosFiltrados(datosPorNivel);
        }
    }



    return (

        datosListos ?
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
                                <label className="input-group-text" htmlFor="selNivel">Nivel</label>
                            </div>
                            <select
                                className="custom-select"
                                id="selNivel"
                                onChange={handleSeleccionarNivel}
                            >
                                <option defaultValue>Seleccione un nivel</option>
                                {
                                    niveles.map((item, i) => (
                                        <option key={"Nivel" + i} value={item.id}> {item.nombre} </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    {
                        // Select de asignatura (materia)
                    }
                    <div className="col-4">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="selAsignatura">Asigntaura</label>
                            </div>
                            <select
                                className="custom-select"
                                id="selAsigntaura"
                                onChange={handleSeleccionarAsignatura}
                            >
                                <option defaultValue value="Todas">Todas</option>
                                {
                                    asignaturas !== null &&
                                    asignaturas.map((item, i) => (
                                        <option key={"asignaturas" + i} value={item}> {item} </option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>

                    {
                        // Botón Buscar   
                    }
                </div>
                {
                    esperando ?
                        (
                            <Tabla array={datosFiltrados} clase="table table-striped sombreado" modo="visor" />
                        ) :
                        (
                            <Tabla array={datosFiltrados} handleEliminarRecurso={handleEliminarRecurso} handleShow={handleEditarRecurso} clase="table table-striped" modo="visor" />
                        )
                }
                {
                    //MODAL
                }
                <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edición de registro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            detalleRecurso !== null &&
                            (
                                <React.Fragment>
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <a href={detalleRecurso.url} target="_blank" rel="noopener noreferrer" >
                                                <img src={detalleRecurso.img_educatico} alt="Imagen del recurso" />
                                            </a>
                                        </div>
                                    </div>
                                    <hr />
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {
                                            detalleRecurso.materia !== undefined &&
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="spnAsignatura">Asignatura</span>
                                                </div>
                                                <input name="materia" ref={register} type="text" className="form-control" readOnly defaultValue={detalleRecurso.materia} aria-describedby="spnAsignatura" />
                                            </div>
                                        }

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="spnNombreRecurso">Nombre del recurso</span>
                                            </div>
                                            <input name="nombre" ref={register} type="text" className="form-control" placeholder="Nombre" defaultValue={detalleRecurso.nombre} aria-describedby="spnNombreRecurso" />
                                        </div>

                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Descripción:</span>
                                            </div>
                                            <textarea name="descripcion" ref={register} className="form-control" defaultValue={detalleRecurso.descripcion} aria-label="With textarea"></textarea>
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
                                                defaultValue={detalleRecurso.url}
                                                ref={register({ required: true })}
                                            />
                                        </div>
                                        {errors.url && <p className="error">URL requerido</p>}

                                        {
                                            //Año por nivel                                      
                                        }
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" >Año:  </span>
                                            &nbsp; &nbsp;
                                            <GrupoCheck nivel={parseInt(detalleRecurso.id_nivel)} nombre="anno" listaAnnos={detalleRecurso.anno} />
                                        </div>
                                        <br />
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
                                                defaultValue={detalleRecurso.img_educatico}
                                                ref={register({ required: true })}
                                            />
                                        </div>
                                        {errors.url && <p className="error">URL requerido</p>}



                                        {
                                            //Apoyo educativo
                                        }
                                        <div className="pretty p-switch p-fill">
                                            <input type="checkbox"
                                                id="chkApoyo"
                                                name="apoyo"
                                                defaultChecked={ parseInt(detalleRecurso.apoyos) }
                                                ref={register}
                                            />
                                            <div className="state">
                                                <label>Apoyo educativo</label>
                                            </div>
                                        </div>

                                        <hr />
                                        <div className="row">
                                            <div className="col-12 text-right">
                                                <button className="btn btn-info btn-lg btn-block" type="submit">
                                                    Guardar datos <i className="far fa-save"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </React.Fragment>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>

            </React.Fragment>
            :
            <span>
                Obteniendo datos del servidor. Por favor espere...
            </span>

    )
}

export default VerRecursos;