import React from 'react';

// set the defaults
const MyContext = React.createContext({
    usuario : {      
      correo: "",
      idUsuario: "",
      nombre: "",
      apellido1: "",
      apellido2: "",
      idTipoUsuario: "",
      etiquetaTipoUsuario: "",
      isAccesado: false},    
    setUsuario : () => {} 
});

export default MyContext;
