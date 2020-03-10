import React, { useContext} from 'react';
import { useForm } from 'react-hook-form';
import MyContext from '../modulos/MyContext';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import enviar from '../modulos/enviar';
import config from '../config.json';
import './Login.css';



function Login() {
    const { usuario, setUsuario } = useContext(MyContext);
    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = data => {
        //console.log("data", data );
        enviar(config.servidor+"Faro/webservices/login.php", data, function (resp) { 
            console.log("respuesta", resp);
            if (resp.error) {
                console.log("error:", resp.error_msg);
                alertify
                .alert( "Error "+ config.nombre,  resp.error_msg, function(){
                    console.log("Ok");                    
                });
                
            } else {
               const  datosUsuario = {
                    correo: resp.usuario,
                    idUsuario: resp.id,
                    tipoUsuario: "admin",
                    isAccesado : true
                };             
                setUsuario(datosUsuario);      
            }
         } )          
    }
    console.log("Errores", errors);    
     
    return (
       <div className="container-login">        
       {
           console.log("Usuario en login", usuario)
           
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
                        <form onSubmit={handleSubmit(onSubmit)} >
                            {errors.usuario && <span className="text-danger"  >Debe escribir su usuario</span> }
                            <div className="input-group form-group">                                
                                <div className="input-group-prepend">
                                    <span className="input-group-text span-login"><i className="fas fa-user"></i></span>                                    
                                </div>
                                <input ref={register({required: true})}  type="text" autoComplete="username"  defaultValue="luis@correo.de" name="usuario" className="form-control" placeholder="Correo del MEP" />                                
                            </div>                            
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text span-login"><i className="fas fa-key"></i></span>
                                </div>
                                <input ref={register({required: true})} name="clave" type="password" autoComplete="current-password" defaultValue="123" className="form-control" placeholder="Contraseña" />
                            </div>
                            <div className="row align-items-center remember">
                                <input type="checkbox" />Rocordarme
					</div>
                            <div className="form-group">
                                <input type="submit"  value="Acceder" className="btn float-right login_btn" />
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