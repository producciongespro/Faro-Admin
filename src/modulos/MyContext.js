import React from 'react';

// set the defaults
const MyContext = React.createContext({
    usuario : {
      direccion: "guada",
      correo: "",
      idUsuario: "",
      tipoUsuario: "",
      isAccesado: false},
    setUsuario : () => {}
});

export default MyContext;
