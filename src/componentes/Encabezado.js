import React, { useContext } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import config from '../config.json';
import MyContext from '../modulos/MyContext';
import avatar from '../assets/img/avatar.png'


function Encabezado() {
    const { user, setUser } = useContext(MyContext);

    
    /*
    const handleCerrarSesion = () => {       

        alertify.confirm(config.nombre, "Desea salir del sistema?",
            function () {
                setUsuario({ isAccesado: false });                
            },
            function () {
                console.log("cancelado cierre de sesión");                
            });            
    }
*/


    return (

        <div className="jumbotron">
            <div className="row">
                <div className="col-10">
                    { user.role === 10 && <h2>Administración de Recursos/Caja de Herramientas</h2>}
                    { user.role === 11 && <h2>Administración de Desarrollo profesional/Caja de Herramientas</h2>}
                    { user.role === 12 && <h2>Administración de Plantillas de planeamiento/Caja de Herramientas</h2>}                    
                </div>

             

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
                            <Dropdown.Item as="button" >{"Nombre: "+ user.name }</Dropdown.Item>
                            <Dropdown.Item as="button" >{"Correo: "+ user.username}</Dropdown.Item>
                            <Dropdown.Item as="button" >Tipo de usuario: {user.type} </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item 
                               // onClick={handleCerrarSesion} 
                                as="button" eventKey="1">
                                    Cerrar sesión
                            </Dropdown.Item>
                        </DropdownButton>
                    </>
                </div>
            </div>
        </div>
    )

}

export default Encabezado;