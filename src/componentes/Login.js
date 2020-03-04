import React, { useState, useContext } from 'react';
import MyContext from '../modulos/MyContext';
import './Login.css';



function Login(props) {

    const { usuario, setUsuario } = useContext(MyContext);

    const acceder =(e)=> {
        e.preventDefault();
        const datosUsuario = {
            correo: "Pepito",
            idUsuario: "456",
            tipoUsuario: "admin",
            isAccesado : true
        };            
        setUsuario(datosUsuario);      
    }

    return (
       <div className="container-login">
           {
               console.log("usuario desde login:", usuario )
               
           }
            <div className="container">
            <br/>
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Ingreso</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span className="span-login" ><i className="fas fa-key"></i></span>                            
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={acceder}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text span-login"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" autoComplete="username" className="form-control" placeholder="Correo del MEP" />

                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text span-login"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" autoComplete="current-password" className="form-control" placeholder="Contraseña" />
                            </div>
                            <div className="row align-items-center remember">
                                <input type="checkbox" />Rocordarme
					</div>
                            <div className="form-group">
                                <input type="submit"  value="Login" className="btn float-right login_btn" />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Solicitud de cuenta <a href="pepito.com">Registro</a>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="pepito.com">¿Olvidó su contraseña?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
    )

}

export default Login;