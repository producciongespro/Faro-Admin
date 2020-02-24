import React, { useState, useEffect } from 'react';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';
import niveles from '../data/niveles.json';


var dataset = null;


async function obtenerDatos(cb) {
    dataset = await obtener("http://localhost/faro/webservices/obtener_recursos.php");
    //niveles = await obtener("http://localhost/Faro-Admin/src/data/niveles.php")
    console.log("niveles", niveles);    
    console.log("dataset", dataset);
    cb()

}


function VerRecursos() {    
    const [nivel, setNivel] = useState(null);
    const [asignatura, setAsignatura ] = useState(null);
    const [asignaturas, setAsignaturas] = useState(null);
    const [tablaFiltrada, setTablaFiltrada] = useState(null);
    const [datosListos, setDatosListos] = useState(false);


    useEffect(() => {  
        obtenerDatos(function () { 
            setDatosListos(true)               
         });
        },[] );

    useEffect (()=>{
        //Cada vez que un estado cambie
        console.log("nivel",nivel);       
        console.log("asignaturas",asignaturas);               
        console.log("Asignatura seleccionda", asignatura);        
    })



    const handleSeleccionarNivel = (e) => {   
        const target = e.target;
        setNivel(target.value);
        const indice = target[target.selectedIndex].getAttribute('data-indice');
        console.log("indice", indice);
        setAsignaturas( niveles[indice].asignaturas )        
    }

    const handleSeleccionarAsignatura =(e)=> {
        //console.log("Asignatura", e.target.value);
        setAsignatura(e.target.value);
        
    }

    const handleObtenerDatosFiltrados = () => {
        //Obtiene un array con el nivel filtrado
        let tmpData = filtrar(dataset, "nivel", nivel);
        //Controlador Render tabla que selecciona materias y año       
        switch (nivel) {
            case "Preescolar":
            case "Primaria":
            case "Secundaria":
                setTablaFiltrada(renderTablaConMateria(tmpData))
                break;
            case "Educación Jóvenes y adultos":
            case "Programa Bandera Azul":
            case "Programa Nacional de Ferias":
            case "Educación intercultural":
                setTablaFiltrada(renderTablaSinMateria(tmpData))
                break;

            default:
                console.log("Nivel no definido en controlador render tabla");
                setTablaFiltrada("No se encuentran resultados")
                break;
        }

    }



    const renderTablaConMateria = (array) => {
        let tmpTabla;
        // array.length === 0 ?         
        // tmpTabla = <span>No se encontraron registros para este nivel. </span>  
        // :              
        tmpTabla = (
            <React.Fragment>
                <table id="tblNivel" className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Asignatura</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Año</th>
                            <th scope="col"> Editar </th>
                            <th scope="col"> Eliminar </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            array !== null &&
                            (
                                array.map((item, i) => (

                                    item.materia === asignatura && 
                                    (
                                        <tr key={"recurso" + i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.materia}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.anno}</td>
                                        <td>
                                            <i className="fas fa-pencil-alt"></i>
                                        </td>
                                        <td>
                                            <i className="far fa-trash-alt"></i>
                                        </td>
                                    </tr>
                                    )

                                ))
                            )
                        }
                    </tbody>
                </table>
            </React.Fragment>
        )
        return tmpTabla;
    }

    const renderTablaSinMateria = (array) => {
        let tmpTabla;
        // array.length === 0 ?         
        // tmpTabla = <span>No se encontraron registros para este nivel. </span>  
        // :        
        tmpTabla = (
            <React.Fragment>
                <table id="tblNivel" className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col"> Editar </th>
                            <th scope="col"> Eliminar </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            array !== null &&
                            (
                                array.map((item, i) => (
                                    <tr key={"recurso" + i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.nombre}</td>
                                        <td>{item.descripcion}</td>
                                        <td>
                                            <i className="fas fa-pencil-alt"></i>
                                        </td>
                                        <td>
                                            <i className="far fa-trash-alt"></i>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </React.Fragment>
        )
        return tmpTabla;
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
                        <option defaultValue>Seleccione una opción</option>
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
            <div className="col-4">
                <button onClick={handleObtenerDatosFiltrados} className="btn btn-outline-primary btn-block">Buscar</button>
            </div>
        </div>
        {tablaFiltrada}
    </React.Fragment>
         :        
            <span>Obteniendo datos del servidor. Por favor espere... </span>          
    
    )
}

export default VerRecursos;