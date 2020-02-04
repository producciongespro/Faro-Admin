import React, { useState } from 'react';
import obtener from '../modulos/obtener';


obtener("https://pokeapi.co/api/v2/gender/1/", function (data) {
    console.log("data", data);
})

function VerRecursos() {

    return (
        <React.Fragment>
            <div className="alert alert-primary" role="alert">
                Admin/Ver recursos
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="selCategoria">Categoría</label>
                </div>
                <select className="custom-select" id="selCategoria">
                    <option defaultValue >Seleccione un opción</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>

        </React.Fragment>
    )
}

export default VerRecursos;