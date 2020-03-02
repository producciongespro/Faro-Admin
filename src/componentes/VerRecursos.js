import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Tabla from './Tabla';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';
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
    //Estado para ocultar o mostrar un modal
    const [show, setShow] = useState(false);
    //cerrar modal
    const handleClose = () => setShow(false);
    
    async function obtenerDatos(cb) {
        datosJson = await obtener(config.servidor + "faro/webservices/obtener_recursos.php");
        console.log("datosJson", datosJson);
        cb()
        //TODO: niveles = await obtener("http://localhost/Faro-Admin/src/data/niveles.php")        
    }


    useEffect(() => {
       // console.log("Componente montado");
        obtenerDatos(function () {
            setDatosListos(true);
        });
    }, []);

    useEffect(() => {
        //console.log("Datos filtrados:", datosFiltrados);         
        //console.log("En Espera", esperando);

    })

    const handleEliminarRecurso = (e) => {
        const id = e.target.id;
        const data = { "id": id, "id_usuario": "106" };

        alertify.confirm("¿Desea realmente eliminar el recurso?",
            function () {
                enviar(config.servidor + "Faro/webservices/eliminar_recurso.php", data, function (param) {
                    //console.log("param",param);  
                    alertify.success(param);
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

    const handleEditarRecurso =(e)=> {
        const id = e.target.id;
        console.log("idItem",id);
        const tmpRecurso = filtrar(datosPorNivel, "id", id );
        console.log("tmpRecursos",tmpRecurso);
        
        
        setShow(true);
    }

    const handleSeleccionarNivel = (e) => {        
        idNivel = parseInt(e.target.value);
        //console.log("indice nivel", idNivel);
        asignaturas = filtrar(niveles, "id", idNivel)[0].asignaturas;
        //console.log("asignaturas",asignaturas);        
        //Filtra array por nivel y lo carga en el estado datosFiltrados:
        datosPorNivel = filtrar(datosJson, "id_nivel", idNivel);
        console.log("datosPorNivel",datosPorNivel);
        
        setDatosFiltrados(datosPorNivel);
    }

    const handleSeleccionarAsignatura = (e) => {
        asignatura = e.target.value;
        console.log("Asignatura", asignatura);
        filtrarPorAsignatura();
    }

    const filtrarPorAsignatura = () => {
        console.log("Asignatura en filtrar nivel", asignatura);
        
        if (asignatura !== "Todas" )  {
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
                            <Tabla array={datosFiltrados} clase="table table-striped sombreado" />
                        ):
                        (
                            <Tabla array={datosFiltrados} handleEliminarRecurso={handleEliminarRecurso}  handleShow={handleEditarRecurso} clase="table table-striped" />
                        )
                    }
                    {
                        //MODAL
                    }                       
                    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edición</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Nombre del recurso</span>
            </div>
            <input type="text" className="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Guardar Cambios
            </Button>
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