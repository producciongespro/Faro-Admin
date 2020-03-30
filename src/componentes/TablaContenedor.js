import React from 'react';

function Tabla(props) {
    return (
        <table id="tblNivel" className={props.clase}>
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
                    props.array !== null &&
                    (
                        props.array.map((item, i) => (
                            <tr key={"recurso" + i}>
                                <th scope="row">{i + 1}</th>
                                <td>{item.nombre}</td>
                                <td>{item.descripcion}</td>
                                        <td>
                                            <i id={item.id} onClick={props.handleShow} className="fas fa-pencil-alt"></i>
                                        </td>
                                        <td>
                                            <i id={item.id} onClick={props.handleEliminarRecurso} className="far fa-trash-alt"></i>
                                        </td>                                    
                            </tr>
                        ))
                    )
                }
            </tbody>
        </table>
    )
}

export default Tabla;