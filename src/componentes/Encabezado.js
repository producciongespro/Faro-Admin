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
                    <h1>Admin</h1>
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
                            <Dropdown.Item as="button" >{usuario.correo}</Dropdown.Item>
                            <Dropdown.Item as="button" >Tipo de usuaario: {usuario.tipoUsuario} </Dropdown.Item>
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