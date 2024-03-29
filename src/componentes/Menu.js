import React, {useContext, useState, useEffect}  from 'react';
import MyContext from '../modulos/MyContext';
import filtrar from '../modulos/filtrar';
import obtener from '../modulos/obtener';
import endpoints from '../endpoints';




function Menu (props) { 
    const { user} = useContext(MyContext);  
    const [botonesFiltrados, setBotonesFiltrados] = useState(null);
    //var arrayBotones = filtrar(botones, "idTipo", usuario.idTipoUsuario )[0].botones;
    var arrayBotones=null;

    useEffect(()=>{
        //console.log("compoente montado, id tipo", usuario.idTipoUsuario);  
        //console.log(config.servidor);              
        obtenerListaBotones();     
    },[] );

    useEffect(()=>{
       // console.log("botonesFiltrados",botonesFiltrados);
        
    })

    async function obtenerListaBotones () {
        arrayBotones= await obtener(endpoints.getBotonesMenu );
        //console.log(arrayBotones);
        //console.log("user en emnu", user);
        if (user.role ) {
            setBotonesFiltrados( filtrar(arrayBotones, "idTipoUsuario", user.role.toString() )  );    
        }               
        
    }
    
    return (
        <React.Fragment>
            <button onClick={props.handleCargarComponentes} data-componente="Inicio" className="btn btn-outline-info btn-block">  Inicio  </button>
            {
             //console.log(arrayBotones)
            }
            {
            botonesFiltrados &&
                botonesFiltrados.map((item, i)=>(
                    <button onClick={props.handleCargarComponentes} data-componente={item.componente }  data-modo={item.modo }  data-idcategoria={item.idCategoria} className="btn btn-outline-info btn-block" key={"btn"+i} >  {item.etiqueta}  </button>
                ))
               
            }
        </React.Fragment>
    )
}

export default Menu;