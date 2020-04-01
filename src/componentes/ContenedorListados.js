import React, {useEffect, useState}  from 'react';
import { Modal } from 'react-bootstrap';
import TablaContenedor from '../componentes/TablaContenedor';
import FormContenedor from '../componentes/FormContenedor';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';
import config from '../config.json';

var datosJson=null;
var subCategorias=null;
var poblacionesIdp=null;
var modo=null;
//var datosFiltrados=null;

function ContenedorListados (props) {
    modo = props.modo;


    const [ datosFiltrados, setDatosFiltrados ] = useState(false);
    const [registro, setRegistro] = useState(null);    
    const [show, setShow] = useState(false);
    //Establece la acción para el formulario: Edición si lo abre desde la tabla o "agregar" si lo abre con el botón agregar registro
    const [accion, setAccion] = useState(null);
    const handleClose = () => setShow(false);

    async function obtenerDatos (cb) {
        datosJson= await obtener(config.servidor + "obtener_oferta_desarrollo.php");
        subCategorias= await obtener (config.servidor + "obtener_sub_categorias_odp.php");
        poblacionesIdp= await obtener (config.servidor + "obtener_poblaciones_idp.php");
        cb();
    }

  useEffect(()=>{
        obtenerDatos(function () {
            //console.log("datosJson",datosJson);            
            setDatosFiltrados( filtrar(datosJson, "oferta", modo ));            
        })
  },[]);

  useEffect(()=>{
      //console.log("datosFiltrados", datosFiltrados);
      console.log("Registro", registro);
            
  })

  const handleAbrirModal =(e)=> {
      const idRegistro =  e.target.id;
      console.log(idRegistro);
      //Establece la acción: edición o agregar
      if (idRegistro === "-1") {
          setAccion("agregar")
      } else {
        setAccion("editar");
        setRegistro( filtrar(datosFiltrados, "id", idRegistro)[0]  );
      }      
      setShow(true);
      
  }

    return (
        <React.Fragment>
            <div className="row">
            <div className="col-sm-12">
                <h4>{props.modo}</h4>                                
            </div>            
            </div>
            <hr/>

            <div className="row">
                <div className="col-sm-12 text-right">
                <button 
                    className="btn btn-info"
                    onClick={handleAbrirModal}
                    id={-1}
                > 
                    <i className="fas fa-plus-circle"></i> Agregar registro                    
                </button>
                </div>
            </div>
            <br/>

        <div className="row">
            <div className="col-sm-12">
                {
                    datosFiltrados &&
                    <TablaContenedor array={datosFiltrados} handleAbrirModal={handleAbrirModal} clase="table table-striped" />
                }
                
            </div>
        </div>


        <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                accion === "editar" && <span>Edición de registro</span>
                            }
                            {
                                accion === "agregar" && <span>Ingreso de registro</span>
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                    {
                                    registro &&                                    
                                        registro.url_imagen &&
                                            <img className="img-thumbnail img-previa" src={registro.url_imagen} alt="imagen de recurso" />
                                    }
                                    </div>
                                </div>
                                <FormContenedor accion={accion} subCategorias={subCategorias} poblacionesIdp={poblacionesIdp} registro={registro} modo={modo} idCategoria={props.idCategoria } />
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>



        </React.Fragment>
    );
    
}


export default ContenedorListados;