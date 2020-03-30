import React, {useEffect, useState}  from 'react';
import TablaContenedor from '../componentes/TablaContenedor';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';
import config from '../config.json';

var datosJson=null;
//var datosFiltrados=null;

function ContenedorListados (props) {

    const [ datosFiltrados, setDatosFiltrados ] = useState(false);

    async function obtenerDatos (cb) {
        datosJson = await obtener(config.servidor + "obtener_oferta_desarrollo.php");      
        cb();
    }

  useEffect(()=>{
        obtenerDatos(function () {
            console.log("datosJson",datosJson);            
            setDatosFiltrados( filtrar(datosJson, "oferta", props.modo ));            
        })
  },[]);

  useEffect(()=>{
      console.log("datosFiltrados", datosFiltrados);      
  })

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
                <button className="btn btn-info"> 
                    <i className="fas fa-plus-circle"></i> Agregar registro                    
                </button>
                </div>
            </div>
            <br/>

        <div className="row">
            <div className="col-sm-12">
                {
                    datosFiltrados &&
                    <TablaContenedor array={datosFiltrados} clase="table table-striped" />
                }
                
            </div>
        </div>
        </React.Fragment>
    );
    
}


export default ContenedorListados;