import React from 'react';

function Inicio () {
    
    return(
        <React.Fragment>
            <div className="alert alert-primary" role="alert">
                Admin/Inicio
            </div>
            <div className="row">
                <div className="col-12">
                    Sistema administrativo para agregar un recurso en la caja de herramientas, http://www.cajadeherramientas.mep.go.cr/app/; <br/> Recuerde que para hacer el proceso debe primero agregarlo en el Portal oficial de Educatico, para eso debe comunicarse con sitioweb@mep.go.cr.
                </div>
            </div>
        </React.Fragment>
    )
}

export default Inicio;