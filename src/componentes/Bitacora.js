import React, { useState, useEffect, useContext } from "react";
import endpoints from "../endpoints";
import Tabla from "../componentes/Tabla";
import MyContext from "../modulos/MyContext";
import { getData } from "gespro-utils";

function Bitacora(props) {
  const [datosJson, setDataJson] = useState(null);
  const { user } = useContext(MyContext);
  console.log("USUARIO EN BITACORA >>>>>> ", user);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    console.log("datosJson", datosJson);
  });

  const setup = async () => {
    const URI = `${endpoints.getBitacora}${establecerTabla(user.role) }`;
    console.log("URI", URI);
     
    const res = await getData(   URI );
    setDataJson(res.reverse());
  };

  const establecerTabla = (role) => {
    let tabla = null;
    switch (role) {
      case "10":
        //Recursos
        tabla = 1;
        break;
      case "11":
        //IDP
        tabla = 2;
        break;
      case "12":
        //Planeamientos
        tabla = 3;
        break;

      default:
          tabla=0
        break;
    };
    return tabla;
  };

  return (
    <React.Fragment>
      <div className="alert alert-primary" role="alert">
        Admin/Bitácora
      </div>
      {datosJson !== null ? (
        <Tabla array={datosJson} clase="table table-striped" modo="bitacora" />
      ) : (
        <span>Por favor espere...</span>
      )}
    </React.Fragment>
  );
}

export default Bitacora;
