import React from 'react';

function Tabla(props) {
    return (
        <table id="tblNivel" className={props.clase}>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Año</th>
                    {
                        props.modo === "visor" &&
                        <React.Fragment>
                            <th scope="col"> Editar </th>
                            <th scope="col"> Eliminar </th>
                        </React.Fragment>
                    }
                    {
                        props.modo === "papelera" &&                        
                            <th scope="col"> Recuperar </th>                        
                    }

                </tr>
            </thead>
            <tbody>
                {
                    props.array !== null &&
                    (
                        props.array.map((item, i) => (
                            <tr key={"recurso" + i}>
                                <th scope="row">{i + 1}</th>
                                <td>{item.nombre}</td>
                                <td>{item.anno}</td>
                                {
                                    props.modo === "visor" &
                                    <React.Fragment>
                                        <td>
                                            <i id={item.id} onClick={props.handleShow} className="fas fa-pencil-alt"></i>
                                        </td>
                                        <td>
                                            <i id={item.id} onClick={props.handleEliminarRecurso} className="far fa-trash-alt"></i>
                                        </td>
                                    </React.Fragment>
                                }
                                   {
                                    props.modo === "papelera" &                                   
                                        <td>
                                            <i id={item.id} onClick={props.handleRecuperarRecurso} className="fas fa-trash-restore"></i>
                                        </td>                                    
                                }

                            </tr>
                        ))
                    )
                }
            </tbody>
        </table>
    )
}

export default Tabla;