import React from 'react';
import moment from 'moment';

function Tabla(props) {
    return (
        <table id="tblNivel" className={props.clase}>
            <thead>
                <tr>
                    <th className="text-center" scope="col">#</th>
                    {
                         // VISOR - PAPELERA - BITACORA
                        (props.modo === "visor" || props.modo === "papelera" || props.modo === "bitacora" ) && 
                        <th className="text-center" scope="col">Recurso</th>
                    }
                    {
                        //PAPELERA
                        props.modo === "papelera" &&                    
                        <th className="text-center" scope="col"> Asignatura </th>                        
                    }
                    {
                        // VISOR - PAPELERA
                        (props.modo === "visor" || props.modo === "papelera") &&                    
                        <th className="text-center" scope="col">Año</th>                                                 
                    }

                    
                    {
                        //VISOR
                        props.modo === "visor" &&                              
                            <th  className="text-center" scope="col"> Editar </th>                            
                    }

                    {
                        //VISOR
                        props.modo === "visor" &&                              
                        <th className="text-center" scope="col"> Eliminar </th>
                    }

                    
                    {
                        //PAPELERA
                        props.modo === "papelera" &&                    
                        <th className="text-center" scope="col"> Recuperar </th>                        
                    }

                    {
                        //BITACORA
                        props.modo === "bitacora" &&                    
                        <th className="text-center" scope="col"> Evento </th>   
                    }
                    {
                        //BITACORA
                        props.modo === "bitacora" &&                    
                        <th className="text-center" scope="col"> Responsable </th>   
                    }

                    {
                        //BITACORA
                        props.modo === "bitacora" &&                    
                        <th className="text-center" scope="col"> Fecha </th>   
                    }
                    
                            
                

                </tr>
            </thead>
            <tbody>
                {
                    props.array !== null &&
                    (
                        props.array.map((item, i) => (
                            <tr key={"recurso" + i}>
                                <th scope="row">{i + 1}</th>                                
                                {
                                    (props.modo === "papelera" || props.modo === "visor" || props.modo === "bitacora" ) && 
                                    <td >{item.nombre}</td>
                                }
                                {
                                    props.modo === "papelera" &&                                       
                                    <td className="text-center">
                                            {item.materia}
                                    </td>                                    
                                }
                                {
                                    (props.modo === "papelera" || props.modo === "visor" ) && 
                                    <td className="text-center" >{item.anno}</td>
                                }
 
                                {
                                    props.modo === "papelera" &&   
                                    <td className="text-center" data-origen={item.id} onClick={props.handleRecuperarRecurso}>
                                            <i data-origen={item.id} className="fas fa-recycle"></i>
                                    </td>                                    
                                } 
                                {
                                    props.modo === "visor" &&   
                                     <td data-origen={item.id} className="text-center e-mouse color-turq" onClick={props.handleShow}>
                                     <i data-origen={item.id} className="fas fa-pencil-alt over-grande"></i>
                                    </td>

                                }
                                {
                                    props.modo === "visor" &&   
                                    <td data-origen={item.id} className="text-center e-mouse color-rojo" onClick={props.handleEliminarRecurso} >
                                        <i data-origen={item.id}  className="far fa-trash-alt over-grande"></i>
                                    </td>
                                } 

                                {
                                    props.modo === "bitacora" &&   
                                    <td  className="text-center "  >
                                        {item.evento}
                                    </td>
                                }                                                                  

                                {
                                    props.modo === "bitacora" &&   
                                    <td  className="text-center "  >
                                        {item.usuario}
                                    </td>
                                }                                                                  

                                {
                                    props.modo === "bitacora" &&   
                                    <td  className="text-center "  >
                                        {moment(item.fecha_evento).fromNow()}
                                    </td>
                                }                                                                  
                                        
                                

                            </tr>
                        ))
                    )
                }
            </tbody>
        </table>
    )
}

export default Tabla;