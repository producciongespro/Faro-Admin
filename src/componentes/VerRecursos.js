import React, { useState } from 'react';
import obtener from '../modulos/obtener';
var dataset=null;


obtener("http://localhost/faro/webservices/obtener_recursos.php", function (data) {    
    dataset = data;
    console.log("data", dataset);
})

function VerRecursos() {    
    const [dataFiltrados, setDataFiltrados] = useState(null);

    const handleFiltrarRecursos =(e)=>{
        const categoria = e.target.value;
        const limite = dataset.length;
        var tmpDataset = [];
        for (let index = 0; index < limite; index++) {            
            if (categoria === dataset[index].nivel  ) {
                tmpDataset.push(dataset[index]);
            }
        }      
        setDataFiltrados(tmpDataset);
    }

    return (
        <React.Fragment>
            <div className="alert alert-primary" role="alert">
                Admin/Ver recursos
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="selCategoria">Categoría</label>
                </div>
               <div className="col-6">
               <select onChange={handleFiltrarRecursos} className="custom-select" id="selCategoria">                    
                    <option defaultValue >Seleccione un opción</option>
                    <option value="prescolar">Preescolar</option>
                    <option value="primaria"> Primaria </option>
                    <option value="secundaria">Secundaria</option>                    
                </select>
               </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Año</th>
                        <th scope="col"> Editar </th>
                        <th scope="col"> Eliminar </th>
                        
                    </tr>
                </thead>
                <tbody>
                      {
                          dataFiltrados !== null && 
                          (
                            dataFiltrados.map((item, i)=>(
                            <tr key={"recurso"+i}>
                                <th scope="row">{i+1}</th>
                                <td>{item.nombre}</td>
                                <td>{item.descripcion}</td>
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
}

export default VerRecursos;