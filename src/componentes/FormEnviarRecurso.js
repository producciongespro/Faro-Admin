import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import MyContext from '../modulos/MyContext';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import GrupoCheck from './GurpoCheck';
import obtenerValoresCheck from '../modulos/obtenerValoresCheck';
import enviar from '../modulos/enviar';
import config from '../config.json';
import niveles from '../data/niveles.json';

//console.log("config", config);

const asignaturaPrimaria = ["Matemática", "Ciencias", "Español", "Estudios Sociales", "Artes Plásticas"];
const asignaturaSecundaria = ["Matemática", "Ciencias", "Biología", "Química", "Español", "Estudios Sociales", "Artes plásticas"];

export default function FormEnviarRecurso() {
  const [nivel, setNivel] = useState(-1);
  const { register, handleSubmit, errors, getValues } = useForm();
  const { usuario } = useContext(MyContext);


  const onSubmit = data => {
    
    const valoresCheck = obtenerValoresCheck("anno");
    console.log("valorescheck", valoresCheck);    

    if (valoresCheck) {
      data.anno = valoresCheck;
      data.id_usuario = usuario.idUsuario;
      console.log( "data", data);      
      enviar( config.servidor + "faro/webservices/registrar_recurso.php", data, function (resp) {
        alertify.alert(
                  config.nombre+" "+config.version, 
                  resp.msj, 
                  function(){ 
                    console.log("ok");                  
                   }
                  );
        } );   
      
    }  else {     
      alertify.alert (config.nombre, "Debe seleccionar al menos un año." );
    } 
   
  }
  //console.log(errors);


  const obtenerNivel = () => {
    setNivel(parseInt(getValues().id_nivel));
  }

  const handleValidarEducatico =(e)=>{
    const  str = e.target.value;
    console.log("Valor obtenido", str);    
    const patt = new RegExp("www.mep.go.cr/educatico");
    const res = patt.test(str);
    console.log("Resultado", res);
    if (res!==true) {
      alertify
        .alert("La url del recruso debe provenir de educatico.", function(){
        console.log("Aceptar");        
  });
    }
            
  }




  return (

    <React.Fragment>
      <div className="alert alert-primary" role="alert">
        Admin/Agregar recursos
      </div>


      <form onSubmit={handleSubmit(onSubmit)}>


        {
          //NIVEL: 
        }
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="selNivel">Nivel</label>
          </div>
          <select className="custom-select" name="id_nivel" ref={register} onChange={obtenerNivel}>
            <option defaultValue value={-1} >Seleccione un nivel</option>
            {
              niveles.map((item, i) => (
                <option key={"nivel" + i } value={item.id }> {item.nombre } </option>
              ))
            }
          </select>
        </div>

        {
          //Año por nivel          
        }
        <GrupoCheck nivel={nivel} nombre="anno"  listaAnnos="vacio" />



        {
          //ASIGNATURA (MATERIA) POR NIVEL : 
          // Primaria y secundaria solamente
          (nivel === 2 || nivel === 3) &&
          (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="selMateria">Asignatura</label>
              </div>
              <select className="custom-select" name="materia" id="selMateria" ref={register({ required: true })} >
                <option defaultValue value={-1} >Seleccione la asignatura</option>
                {
                  //Caso de primaria
                  nivel === 2 &&
                  (
                    asignaturaPrimaria.map((item, i) => (
                      <option key={"asignatura" + i} value={item}> {item} </option>
                    ))
                  )
                }
                {
                  //Caso de secundaria
                  nivel === 3 &&
                  (
                    asignaturaSecundaria.map((item, i) => (
                      <option key={"asignatura" + i} value={item}> {item} </option>
                    ))
                  )
                }
              </select>
            </div>
          )
        }

        {
          //NOMBRE: 
        }
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Nombre</span>
          </div>
          <input type="text" className="form-control" name="nombre" id="txtNombre" aria-label="Default" placeholder="Escriba aquí el nombre del recurso." ref={register({ required: true, max: 32, min: 0, maxLength: 80 })} />
        </div>
          {errors.nombre && <p className="error" >Nombre requerido</p>}

          {
          //URL
        }
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" >URL</span>
          </div>
          <input
            onBlur={handleValidarEducatico}
            type="text"
            name="url"
            id="txtUrl"
            className="form-control"
            aria-label="Default"
            placeholder="Escriba la dirección web del recurso en Educatico."
            ref={register({ required: true })}
          />          
        </div>
        {errors.url && <p className="error">URL requerido</p>}


        {
          //URL IMAGEN
        }
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" >URL Imagen</span>
          </div>
          <input            
            type="text"
            name="img_educatico"
            id="txtUrlImagen"
            className="form-control"
            aria-label="Default"
            placeholder="Coloque la dirección web de la imagen miniatura del recurso."
            ref={register({ required: true })}
          />          
        </div>
        {errors.url && <p className="error">URL requerido</p>}


        {
          //DESCRIPCIÓN: 
        }
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Descripción</span>
          </div>
          <textarea 
            id="txtDesc"
            name="descripcion" 
            className="form-control" 
            aria-label="With textarea" 
            placeholder="Breve descripición del recurso" 
            ref={register}  
          />
            
        </div>
        <br />


        

        {
          //Apoyo educativo
        }
        <div className="pretty p-switch p-fill">
          <input type="checkbox" 
            id="chkApoyo"
            name="apoyo" 
            ref={register}
            />
          <div className="state">
            <label>Apoyo educativo</label>
          </div>
        </div>
        <hr />
        <button type="submit" className="btn btn-primary"  > Enviar  </button>

        
      </form>

    </React.Fragment>
  );
}

