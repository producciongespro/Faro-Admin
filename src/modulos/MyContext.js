import React from 'react';

// set the defaults
const MyContext = React.createContext({
    usuario : {      
      correo: "",
      idUsuario: "",
      tipoUsuario: "",
      isAccesado: false},    
    setUsuario : () => {},
    saludo: {
      texto: "Hola a todos"
    }
});

export default MyContext;
