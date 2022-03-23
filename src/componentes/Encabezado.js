import React, { useContext } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import MyContext from '../modulos/MyContext';
import avatar from '../assets/img/avatar.png'


function Encabezado(props) {
    const { user } = useContext(MyContext);
   

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
                               onClick={props.handleCerrarSesion} 
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