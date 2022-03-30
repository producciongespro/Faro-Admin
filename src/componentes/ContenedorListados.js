import React, {useEffect, useState, useContext}  from 'react';
import { Modal } from 'react-bootstrap';
import MyContext from '../modulos/MyContext';
import TablaContenedor from '../componentes/TablaContenedor';
import FormContenedor from '../componentes/FormContenedor';
import obtener from '../modulos/obtener';
import enviar from '../modulos/enviar';
import filtrar from '../modulos/filtrar';
import endpoints from '../endpoints';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

var datosJson=null;
var categorias=null;
var poblacionesIdp=null;
var modo=null;
//var datosFiltrados=null;

/** Este componente es un contenedor de las vistas en ODP
*@author Luis Ch Campos
*/



function ContenedorListados (props) {
    modo = props.modo; 
    const { user } = useContext(MyContext);     

    const [ datosFiltrados, setDatosFiltrados ] = useState(false);
    const [registro, setRegistro] = useState(null);    
    const [show, setShow] = useState(false);
    /**
    Establece la acción para el formulario: Edición si lo abre desde la tabla o "agregar" si lo abre con el botón agregar registro
    */
    const [accion, setAccion] = useState(null);
    const handleClose = () => setShow(false);

    const handleRecargar=()=> {
        //recarga la tabla una vez que se haya actualizado un registro  o se haya insertado uno.
        setShow(false);
        obtenerDatos(function () {
            //console.log("datosJson",datosJson);            
            setDatosFiltrados( filtrar(datosJson, "oferta", modo ));            
        })  
    }

    /**
 * Descargar sub categorías y poblaciones de la ODP.
 *
 * @async
 * @function downloadData
 * @param {string} url - url del servicio para obtener los datos
 * @return {Promise<string>} The data from the URL.
 */
    async function obtenerDatos (cb) {
        datosJson=await obtener(endpoints.getODP);
        //console.log("******datosJson",datosJson);               
        categorias=await obtener (endpoints.getSubODP);        
        //console.log("*******categorias",categorias);                
        poblacionesIdp=await obtener (endpoints.getPoblacionesIDP);
        //console.log("*******poblacionesIdp",poblacionesIdp);
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
      //console.log("Registro", registro);
            
  })

  const handleEliminarRegistro =(e)=>{           
    let dataDel = {
          "id": e.target.id,
          "usuario": user.username,
          "token": user.token
    };    
    console.log("Registro a eliminar", dataDel);                     
    alertify.confirm(process.env.REACT_APP_NOMBRE, "¿Desea realemnte eliminar el registro?",
        function(){
            enviar ( endpoints.delODP, dataDel, function (resp) {
                //Calback depsués de eliminar un registro:
                alertify.alert(process.env.REACT_APP_NOMBRE, resp.msj );
                //REcupera el json actualizado del servidor                 
                obtenerDatos(function () {
                    //console.log("datosJson",datosJson);            
                    setDatosFiltrados( filtrar(datosJson, "oferta", modo ));            
                })
            })            
        },
        function(){
            console.log("Operación 'Eliminar' cancelada");      
        });

      
  }

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
                    <TablaContenedor array={datosFiltrados} handleEliminarRegistro={handleEliminarRegistro}  handleAbrirModal={handleAbrirModal} clase="table table-striped" />
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
                                accion === "editar" && 
                                    <span>
                                    Edición de registro de {props.modo}
                                    </span>
                            }
                            {
                                accion === "agregar" && 
                                    <span>
                                        Ingreso de registro de {props.modo}
                                    </span>
                            }
                            {
                                console.log("props.idCategoria ",props.modo )
                                
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                    {
                                    registro &&                                    
                                        registro.url_imagen &&
                                            <img className="img-thumbnail img-previa" src={  endpoints.assets+"img/7_desarrollo_prof/"+registro.url_imagen} alt="imagen de recurso" />                                    }
                                    </div>
                                </div>
                                
                                <FormContenedor accion={accion} categorias={categorias} poblacionesIdp={poblacionesIdp} registro={registro} modo={modo} idCategoria={props.idCategoria }  handleRecargar={handleRecargar}   />
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>



        </React.Fragment>
    );
    
}


export default ContenedorListados;