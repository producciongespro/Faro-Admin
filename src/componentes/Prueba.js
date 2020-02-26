import React, { useState, useEffect  } from 'react';
import obtener from '../modulos/obtener';
import config from '../config.json';

var datosJson=null;
var nivel=null
function Prueba () {        
    const [datosFiltrados, setDatosFiltrados ] = useState(null);
    //const [nivel, setNivel]= useState(null);
    const [isReady, setReady ]= useState(false);
    

    async function obtenerDatos() {
        datosJson  = await obtener(config.servidor + "faro/webservices/obtener_recursos.php");
        //setDatosFiltrados(datosJson);       
        console.log("DATA", datosJson);
        
        setReady(true);
    }

    const handleSelNivel =(e)=>{
        nivel = e.target.value;        
        filtrarDatos();
    }


    useEffect(()=>{
        console.log("DidMount");        
        obtenerDatos();
    },[] )


    useEffect(()=>{
        console.log("datosFiltrados", datosFiltrados);
        console.log("Nivel", nivel); 
        console.log("isReady",isReady);       
        
 })

 const filtrarDatos=()=>{
    console.log("nivel para filtrar ",nivel);    
     let tmpFiltrado =[];
     console.log("datosJson",datosJson);     
     
        if (datosJson!==null) {
            for (let index = 0; index < datosJson.length; index++) {
                console.log("NIVEL", datosJson[index].nivel);            
                if (datosJson[index].nivel === nivel ) {
                    tmpFiltrado.push(datosJson[index])
                }         
            }
            console.log("tmpFiltrado",tmpFiltrado);     
            setDatosFiltrados(tmpFiltrado);                     
        }
 }

    return (

        <div className="row">
            <div className="col-12">
                <h1>Datos</h1>
                <select onChange ={handleSelNivel} >
                    <option defaultValue value={-1} >Seleccione un valor </option>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                </select>
                {
                    datosFiltrados !== null &&
                    datosFiltrados.map((item,i)=>(
                            <p key={i}>
                                {item.nombre}
                            </p>
                        ))
                }
            </div>
        </div>
    )
    
}

export default Prueba;