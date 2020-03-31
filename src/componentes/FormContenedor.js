import React from 'react';
import { useForm } from 'react-hook-form';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';


function FormContenedor(props) {
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = data => {
        console.log("Datos a enviar al servidor", data);
        reset();
    }
    console.log(errors);

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
            <div className="row">
                <div className="col-sm-12">
                    <h6>Formulario</h6>
                    <div className="input-group flex-nowrap">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="spnNombre">Nombre</span>
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
                            <span className="input-group-text">Descripción</span>
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
                            <span className="input-group-text" >Url</span>
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
                    <div className="input-group flex-nowrap">
                        <div className="input-group-prepend">
                            <span className="input-group-text" >Url de la imagen</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Url"
                            defaultValue={devolverPropiedad(props.registro, "url_imagen")}
                            name="url_imagen"
                            ref={register({ required: true })}
                        />
                    </div>
                    <br />
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selSubCategoria">Subcategoría</label>
                        </div>
                        <select 
                            className="custom-select" 
                            id="selSubCategoria"
                            name="subcategoria"                            
                            defaultValue={devolverPropiedad(props.registro, "sub_categoria")}
                            ref={register({ required: true })}
                            >
                            {
                                props.subCategorias.map((item,i)=>(
                                    <option key={"subcategoria"+i} value={item.sub_categoria} > {item.sub_categoria} </option>
                                ))
                            }
                        </select>
                    </div>
                    <br />
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="selPoblacion">Población</label>
                        </div>
                        <select 
                            className="custom-select" 
                            id="selPoblacion"
                            name="poblacionIdp"
                            defaultValue={devolverPropiedad(props.registro, "poblacion")}
                            ref={register({ required: true })}
                            >
                            {
                                props.poblacionesIdp.map((item,i)=>(
                                    <option key={"subcategoria"+i} value={item.nombre} > {item.nombre} </option>
                                ))
                            }
                        </select>
                    </div>



                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-sm-12 text-right">
                    <button type="submit" className="btn btn-outline-info">
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