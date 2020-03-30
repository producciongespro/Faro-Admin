import React, {useContext}  from 'react';
import botones from '../data/menu-botones.json';
import MyContext from '../modulos/MyContext';
import filtrar from '../modulos/filtrar';

function Menu (props) { 
    const { usuario} = useContext(MyContext);  
    const arrayBotones = filtrar(botones, "idTipo", usuario.idTipoUsuario )[0].botones;
    
    return (
        <React.Fragment>
            {
             //console.log(arrayBotones)
            }
            {               
               arrayBotones.map((item, i)=>(
                    <button onClick={props.handleCargarComponentes} data-comp={item.comp }  data-modo={item.modo }  className="btn btn-outline-info btn-block" key={"btn"+i} >  {item.nombre}  </button>
                ))
               
            }
        </React.Fragment>
    )
}

export default Menu;