import React, { useState, useEffect } from 'react';
//import DataTable from 'datatables.net';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';

var dataset = null;


const niveles = ["Prescolar", "Primaria", "Secundaria", "Educación intercultural", "Educación Jóvenes y adultos", "Programa Nacional de Ferias", "Programa Bandera Azul"];
//const annosPrimaria = [1, 2, 3, 4, 5, 6];
//const annosSecundaria = [7, 8, 9, 10, 11];
//const asignaturaPrimaria = ["Matemática", "Ciencias", "Español", "Estudios sociales", "Artes plásticas"];
//const asignaturaSecundaria = ["Matemática", "Ciencias", "Biología", "Química", "Español", "Estudios sociales", "Artes plásticas"];




function VerRecursos() {    
    const [nivel, setNivel] = useState(null);
    const [tablaFiltrada, setTablaFiltrada] = useState(null);
    const [datosListos, setDatosListos] = useState(false);




  


    useEffect(() => {  
        //Didmount              
        //Se hace petición Ajax 
         obtener("http://localhost/faro/webservices/obtener_recursos.php", function (data) {
            dataset = data;
            console.log("dataset:", dataset);
            setDatosListos(true)               
            })               
        },[] );

    useEffect (()=>{
        //Cada vez que un estado cambie
        console.log("nivel",nivel);       
        
    })



    const handleSeleccionarNivel = (e) => {
        setNivel(e.target.value);
    }

    const handleObtenerDatosFiltrados = () => {
        //Obtiene un array con el nivel filtrado
        let tmpData = filtrar(dataset, "nivel", nivel);
        //Controlador Render tabla que selecciona materias y año       
        switch (nivel) {
            case "Prescolar":
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
                                            <i id={item.id}  onClick={handleEliminar} className="far fa-trash-alt"></i>
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

    const handleEliminar = (e)=>{
        console.log("id a eliminar", e.target.id);
        
    }


    return (
    
        datosListos ?        
            <React.Fragment>
            <div className="alert alert-primary" role="alert">
            Admin/Ver recursos
            </div>         
    
        <div className="row">
            <div className="col-8">
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
                                <option key={"Nivel" + i} value={item}> {item} </option>
                            ))
                        }
                    </select>
                </div>
            </div>
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