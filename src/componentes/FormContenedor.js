import React, { useContext } from 'react';
import MyContext from '../modulos/MyContext';
import { useForm } from 'react-hook-form';
import enviar from '../modulos/enviar';
import config from '../config.json';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

/**
 * Contenedor de formulario
 * @author Luis Ch C
 * @param {*} props registro id
 */

function FormContenedor(props) {
    const { register, handleSubmit, errors, reset } = useForm();
    const { usuario } = useContext(MyContext);


    const onSubmit = data => {
        let urlAPI = config.servidor;
        switch (props.accion) {
            case "agregar":
                urlAPI = urlAPI + "registrar_odp.php";
                break;
            case "editar":
                urlAPI = urlAPI + "actualizar_odp.php";
                //en edición envia el id del registro a editar:
                data.id = props.registro.id;
                break;

            default:
                break;
        }
        //console.log("urlARPI",urlAPI);
        //Se agregan las demás propiedades al dataform
        data.id_tipo = props.idCategoria;
        data.usuario = usuario.idUsuario;
        console.log("Datos a enviar al servidor", data);


        enviar(urlAPI, data, function (resp) {
            console.log(resp);
            alertify.alert(config.nombre, resp.msj);
            //Resetea los datos del formulario
            reset();
            //Cierra el modal que contiene el formualrio
            //y recargar la tabla
            props.handleRecargar();
        })


    }
    console.log("errors", errors);




    const devolverPropiedad = (registro, llave) => {
        //Devuelve una propiedad de registro para renderizarla en el inpout en caso de que sea modo editar
        //En insertar registro no renderiza ningún dato
        let propiedad = "";
        if (props.accion === "editar") {
            if (registro) {
                propiedad = registro[llave];
            }
        }
        return propiedad;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                // console.log(props.subCategorias)

            }
            <div className="row">
                <div className="col-sm-12">
                    <div className="input-group flex-nowrap">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="spnNombre">
                                {errors.nombre && <i className="mr-2 text-danger fas fa-exclamation-circle"></i>}
                                Nombre
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del recurso"
                            defaultValue={devolverPropiedad(props.registro, "nombre")}
                            name="nombre"
                            ref={register({ required: true })}
                        />
                    </div>
                    <br />

                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                {errors.descripcion && <i className="mr-2 text-danger fas fa-exclamation-circle"></i>}
                                Descripción
                            </span>
                        </div>
                        <textarea
                            id="txtDesc"
                            name="descripcion"
                            className="form-control"
                            aria-label="With textarea"
                            defaultValue={devolverPropiedad(props.registro, "descripcion")}
                            placeholder="Breve descripición del recurso"
                            ref={register({ required: true })}
                        />
                    </div>
                    <br />

                    <div className="input-group flex-nowrap">
                        <div className="input-group-prepend">
                            <span className="input-group-text" >
                                {errors.url && <i className="mr-2 text-danger fas fa-exclamation-circle"></i>}
                                Url
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Url"
                            defaultValue={devolverPropiedad(props.registro, "url")}
                            name="url"
                            ref={register({ required: true })}
                        />
                    </div>
                    <br />
                    {
                        //Si son cursos virtuales debe ir el campo imagen requerido
                        props.idCategoria === "1" &&
                        (
                            <div className="input-group flex-nowrap">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >Nombre de la imagen</span>
                                </div>


                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ejemplo: 'word.png'"
                                    defaultValue={devolverPropiedad(props.registro, "url_imagen")}
                                    name="url_imagen"
                                    ref={register({ required: true })}
                                />


                            </div>
                        )}
                    <br />

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selSubCategoria">
                                {errors.id_sub_categoria && <i className="mr-2 text-danger fas fa-exclamation-circle"></i>}
                                Subcategoría
                            </label>
                        </div>
                        <select
                            className="custom-select"
                            id="selSubCategoria"
                            name="id_sub_categoria"
                            defaultValue={devolverPropiedad(props.registro, "sub_categoria")}
                            ref={register({ required: true })}
                        >
                            {
                                props.subCategorias.map((item, i) => (
                                    <option key={"subcategoria" + i} value={item.id} > {item.nombreCategoria} </option>
                                ))
                            }
                        </select>
                    </div>
                    <br />
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selPoblacion">
                                {errors.poblacion && <i className="mr-2 text-danger fas fa-exclamation-circle"></i>}
                                Población
                            </label>
                        </div>
                        <select
                            className="custom-select"
                            id="selPoblacion"
                            name="poblacion"
                            defaultValue={devolverPropiedad(props.registro, "poblacion")}
                            ref={register({ required: true })}
                        >
                            {
                                props.poblacionesIdp.map((item, i) => (
                                    <option key={"subcategoria" + i} value={item.nombre} > {item.nombre} </option>
                                ))
                            }
                        </select>
                    </div>
                    
                  

{
    /**
     @todo Quitar esto para producción
     selects de rquerimientos
     */
    console.log("props.idCategoria", props.idCategoria)
}
                   {
                       //---Cursos virtuales
                       props.idCategoria === "1" &&
                       <div className="input-group mb-3">
                       <div className="input-group-prepend">
                           <label className="input-group-text" htmlFor="selSubcategoria">
                               {
                               //errors.poblacion && <i className="mr-2 text-danger fas fa-exclamation-circle"></i>
                               }
                               Subcategoría
                           </label>
                       </div>
                       <select
                           className="custom-select"
                           id="selSubcategoria"
                           name="subcategoria"
                           //defaultValue={devolverPropiedad(props.registro, "poblacion")}
                           //ref={register({ required: true })}
                       >
                           <option value="1"> Prácticas docentes </option>
                           <option value="2"> Gestión de centros educativos </option>
                           <option value="3">Efectividad en la gestión pública </option>
                       </select>
                   </div>
                   }

                    {
                       //---Videoteca
                       props.idCategoria === "3" &&
                       <div className="input-group mb-3">
                       <div className="input-group-prepend">
                           <label className="input-group-text" htmlFor="selSubcategoria">
                               {
                               //errors.poblacion && <i className="mr-2 text-danger fas fa-exclamation-circle"></i>
                               }
                               Subcategoría
                           </label>
                       </div>
                       <select
                           className="custom-select"
                           id="selSubcategoria"
                           name="subcategoria"
                           //defaultValue={devolverPropiedad(props.registro, "poblacion")}
                           //ref={register({ required: true })}
                       >
                           <option value="1"> Educación especial </option>
                           <option value="2"> Educación preescolar </option>
                           <option value="3"> Educación ambiental </option>
                           <option value="4"> Tecnología y educación </option>
                           <option value="5"> Aspectos educativos </option>
                           <option value="6"> Lesgislación educativa </option>
                           <option value="3"> Planeamiento </option>
                       </select>
                   </div>
                   }

{
                       //---Otras ofertas
                       props.idCategoria === "5" &&
                       <div className="input-group mb-3">
                       <div className="input-group-prepend">
                           <label className="input-group-text" htmlFor="selSubcategoria">
                               {
                               //errors.poblacion && <i className="mr-2 text-danger fas fa-exclamation-circle"></i>
                               }
                               Subcategoría
                           </label>
                       </div>
                       <select
                           className="custom-select"
                           id="selSubcategoria"
                           name="subcategoria"
                           //defaultValue={devolverPropiedad(props.registro, "poblacion")}
                           //ref={register({ required: true })}
                       >
                           <option value="1"> Nacionales </option>
                           <option value="2"> Extranjeras </option>
                           
                       </select>
                   </div>
                   }
                    



                </div>
            </div>
            <br />
            <div className="row">
                {
                    //Verifica si el objeto tiene al menos una propiedad para lanzar el alert
                    //Esto evita que se lance el "alert" cuando se carga el formulario
                    Object.keys(errors).length !== 0 &&
                    <div className="col-md-8 offset-md-2 alert alert-danger" role="alert">
                        Debe competar los datos requeridos.
                        </div>
                }
            </div>
            <div className="row">
                <div className="col-sm-12 text-right">
                    <button type="submit" className="btn btn-outline-info"  >
                        {
                            props.accion === "editar" && <span>Guardar cambios</span>
                        }
                        {
                            props.accion === "agregar" && <span>Agregar registro</span>
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FormContenedor;