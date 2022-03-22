import React from 'react';
import './Login.css';




export default function LoginSSO(props) {





    return (
        
       <div className="container-login">              
       <div className="container">
           <br />
           <div className="d-flex justify-content-center h-100">
               <div className="card">
                   <div className="card-header">
                   <h3>Ingreso</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span className="span-login" ><i className="fas fa-key"></i></span>                            
                        </div>
                   </div>
                   <div className="card-body">
                       <button  
                       className="btn login_btn"
                       onClick={props.handleLogin}
                         >Ingresar con cuenta MEP</button>
                   </div>

               </div>
           </div>
        </div>
        </div>
           
    )
    
};


