import React from 'react';


const annosPrimaria = [
  {
    "id": 1,
    "nombre": "Primero"
  },
  {
    "id": 2,
    "nombre": "Segundo"
  },
  {
    "id": 3,
    "nombre": "Tercero"
  },
  {
    "id": 4,
    "nombre": "Cuarto"
  },
  {
    "id": 5,
    "nombre": "Quinto"
  },
  {
    "id": 6,
    "nombre": "Sexto"
  }

];
const annosSecundaria = [
  {
    "id": 7,
    "nombre": "Sétimo"
  },
  {
    "id": 8,
    "nombre": "Octavo"
  },
  {
    "id": 9,
    "nombre": "Noveno"
  },
  {
    "id": 10,
    "nombre": "Décimo"
  },
  {
    "id": 11,
    "nombre": "Undécimo"
  },
  {
    "id": 12,
    "nombre": "Duodécimo"
  }

];
const niveles=[
  {
    "id": 1,
    "nombreNivel": "Preescolar"
  },
  {
    "id": 2,
    "nombreNivel": "Primaria"
  },
  {
    "id": 3,
    "nombreNivel": "Secundaria"
  },
  {
    "id": 4,
    "nombreNivel": "Educación intercultural"
  },
  {
    "id": 5,
    "nombreNivel": "Educación jóvenes y adultos"
  }
];
const annosPedagoHosp=[ 
    {
      "id": 1,
      "nombre": "Primero"
    },
    {
      "id": 2,
      "nombre": "Segundo"
    },
    {
      "id": 3,
      "nombre": "Tercero"
    },
    {
      "id": 4,
      "nombre": "Cuarto"
    },
    {
      "id": 5,
      "nombre": "Quinto"
    },
    {
      "id": 6,
      "nombre": "Sexto"
    }
 ];



function GrupoCheck(props) {
    //console.log("************Props de Grupocheck", props.nivel); 
    //console.log("************Props de Grupocheck listaAnnos", props.listaAnnos);
    var listaAnnos =  props.listaAnnos.split(',');    
    //console.log("listaAnnos",listaAnnos);

    /*En caso de que el usuario escoga todos los niveles, se renderiza los niveles desde primatria hasta Agenda estudiantil, entre otros    
    Se
    */ 
    //niveles= props.niveles;
    //console.log("niveles", niveles);
    
    
/*
  CArga decheck en el modo editar:
  recibe mediante parametros la lista de la tabla y los que están check 
*/
    var Chk = (props)=>{
      var tmpChk;
      let encontrado = false;      
      for (let index = 0; index < listaAnnos.length; index++) {
        //console.log("listaAnnos[index]",listaAnnos[index]);
        //console.log("props.value",props.value);               
        if (listaAnnos[index] === props.value) {
          encontrado = true
          tmpChk = <input  
                      type="checkbox" 
                      value={props.value}  
                      name={props.name} 
                      defaultChecked={true}                
                    />
        } else {         
            if (encontrado !== true) {
              tmpChk = <input  
                      type="checkbox" 
                      value={props.value}  
                      name={props.name} 
                      defaultChecked={false}                
                    />
            }
        }        
      }          
      return tmpChk;
    }
    
    
 
  return (
    <div className="row my-2">
      <div className="col-12">    
      {
        (props.nivel === 2) &&
        (
          annosPrimaria.map((item, i) => (
            <div key={"primaria"+i} className="pretty p-default">
              <Chk  value={item} name={props.nombre }  />              
              <div className="state p-primary">
                <label>{item}</label>
              </div>
            </div>
          ))
        )
      }
      {
        (props.nivel === 3) &&
        (
          annosSecundaria.map((item, i) => (
            <div key={"secundaria"+i} className="pretty p-default">
              <Chk  value={item.nombre} name={props.nombre }  />                            
              <div className="state p-primary">
                <label>{item.nombre}</label>
              </div>
            </div>
          ))
        )
      }      
          {
            //**********Pedagogía Hospitalaria */
        (props.nivel === 6) &&
        (
          annosPedagoHosp.map((item, i) => (
            <div key={"ph"+i} className="pretty p-default">
              <Chk  value={item.nombre } name={props.nombre }  />                            
              <div className="state p-primary">
                <label>{item.nombre}</label>
              </div>
            </div>
          ))
        )
      }

{
  // Para todos los niveles
        (props.nivel === 0) &&
        (
          niveles.map((item, i) => (
            <div key={"niveles"+i} className="pretty p-default">
              <Chk  value={item.id} name={props.nombre }  />                            
              <div className="state p-primary">
                <label>{item.nombreNivel}</label>
              </div>
            </div>
          ))
        )
      }
      </div>
    </div>

  )
}


export default GrupoCheck;