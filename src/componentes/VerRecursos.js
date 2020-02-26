import React, { useState, useEffect } from 'react';
import Tabla from './Tabla';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';
import niveles from '../data/niveles.json';
import enviar from '../modulos/enviar';
import config from '../config.json';

var asignaturas= null;
var datosJson= null;
var datosPorNivel=null;


function VerRecursos() {  
    const [datosFiltrados, setDatosFiltrados]= useState(null);       
    const [datosListos, setDatosListos]= useState(false);
    
    async function obtenerDatos() {
        datosJson = await obtener(config.servidor + "faro/webservices/obtener_recursos.php");        
        console.log("datosJson", datosJson);        
        setDatosListos(true);
        //TODO: niveles = await obtener("http://localhost/Faro-Admin/src/data/niveles.php")        
    }


    useEffect(() => {  
        console.log("Componente montado");        
        obtenerDatos();
        },[] );

    useEffect (()=>{       
        //console.log("Datos filtrados:", datosFiltrados);         
    })

 

    const handleEliminarRecurso =(e)=> {
        const id = e.target.id;
        const data = {"id": id,"id_usuario": "106" };
        enviar(config.servidor + "Faro/webservices/eliminar_recurso.php", data, function (param) { 
            //console.log("param",param);  
            alertify.alert(
                config.nombre+" "+config.version, 
                param, 
                function(){ 
                  console.log("ok");                  
                  //handleObtenerDatosFiltrados();
                 }
                );          
         } )        
    }



    const handleSeleccionarNivel = (e) => {   
        const target = e.target;        
        const nivel = target.value;
        const indice = target[target.selectedIndex].getAttribute('data-indice');
        console.log("indice nivel", indice);
        asignaturas = niveles[indice].asignaturas;
        //Filtra array por nivel y lo carga en el estado datosFiltrados:
        datosPorNivel = filtrar(datosJson, "nivel", nivel  );
        setDatosFiltrados(datosPorNivel);        
    }

    


    const handleSeleccionarAsignatura =(e)=> {        
        const asignatura = e.target.value;
        console.log("Asignatura", asignatura);
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
                                <option key={"Nivel" + i}  data-indice={i} value={item.nombre }> {item.nombre} </option>
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
                                <option key={"asignaturas" + i} value={item }> {item} </option>
                            ))                            
                        }
                    </select>
                </div>

            </div>

                {
                 // Botón Buscar   
                }            
        </div>
        <Tabla array={datosFiltrados}  handleEliminarRecurso={handleEliminarRecurso} />
    </React.Fragment>
         :        
            <span>Obteniendo datos del servidor. Por favor espere... </span>          
    
    )
}

export default VerRecursos;