import React from 'react';

/*
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
*/


const MyContext = React.createContext({
  user : {      
    name: null,
    username: null,
    role: null
    },    
  setUser : () => {} 
});

export default MyContext;
