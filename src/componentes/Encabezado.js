import React, { useContext } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import config from '../config.json';
import MyContext from '../modulos/MyContext';
import avatar from '../assets/img/avatar.png'


function Encabezado() {
    const { usuario, setUsuario } = useContext(MyContext);

    const handleCerrarSesion = () => {       

        alertify.confirm(config.nombre, "Desea salir del sistema?",
            function () {
                setUsuario({ isAccesado: false });                
            },
            function () {
                console.log("cancelado cierre de sesión");                
            });            
    }

    return (

        <div className="jumbotron">
            <div className="row">
                <div className="col-10">
                    { usuario.idTipoUsuario === 1 && <h2>Administración de Recursos </h2>}
                    { usuario.idTipoUsuario === 2 && <h2>Administración de Desarrollo profesional </h2>}
                    { usuario.idTipoUsuario === 3 && <h2>Administración de Plantillas de planeamiento </h2>}
                    <span>
                        Usuario actual: <strong>{usuario.correo}</strong>
                    </span>
                </div>

                {
                    //console.log("usuario",usuario)

                }

                <div className="col-2">
                    <>
                        <DropdownButton
                            alignRight
                            variant="link"
                            title={
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="avatar"
                                />
                            }
                        >
                            <Dropdown.Item as="button" >{"Nombre: "+ usuario.nombre + " " + usuario.apellido1 + " " + usuario.apellido2 }</Dropdown.Item>
                            <Dropdown.Item as="button" >{"Correo: "+ usuario.correo}</Dropdown.Item>
                            <Dropdown.Item as="button" >Tipo de usuaario: {usuario.etiquetaTipoUsuario} </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleCerrarSesion} as="button" eventKey="1">Cerrar sesión</Dropdown.Item>
                        </DropdownButton>
                    </>
                </div>
            </div>
        </div>
    )

}

export default Encabezado;