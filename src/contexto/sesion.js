import React from 'react';

const Sesion = React.createContext({
    usuario : {
      correo: "",
      idUsuario: "",
      tipoUsuario: "",
      isAcesado: true},
    setUsuario : () => {}
});
 
export default Sesion;