import React, {useEffect}  from 'react';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';
import config from '../config.json';

var datosJson=null;
var datosFiltrados=null;

function ContenedorListados (props) {

    async function obtenerDatos (cb) {
        datosJson = await obtener(config.servidor + "obtener_oferta_desarrollo.php");      
        cb();
    }

  useEffect(()=>{
        obtenerDatos(function () {
            //console.log(datosJson);            
            datosFiltrados = filtrar(datosJson, "oferta", props.modo );
            console.log(datosFiltrados);
            
        })
  },[])

    return (
        <div className="row">
            <div className="col-sm-12">
                <h4>{props.modo}</h4>
            </div>
        </div>
    );
    
}


export default ContenedorListados;