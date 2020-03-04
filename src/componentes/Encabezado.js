import React, { useContext } from 'react';
import MyContext from '../modulos/MyContext';


function Encabezado () {
    const { usuario } = useContext(MyContext);

    return (
        <div className="jumbotron">            
            <h1>Admin</h1>
            <span>
                Usuario actual: <strong>{usuario.correo }</strong> 
            </span>
        </div>
    )
    
}

export default Encabezado;