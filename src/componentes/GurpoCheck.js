import React from 'react';

const annosPrimaria = [
    {
      "id" : 1,
      "nombre" : "Primero"    
    },
    {
      "id" : 2,
      "nombre" : "Segundo"    
    },
    {
      "id" : 3,
      "nombre" : "Tercero"    
    },
    {
      "id" : 4,
      "nombre" : "Cuarto"    
    },
    {
      "id" : 5,
      "nombre" : "Quinto"    
    },
    {
      "id" : 6,
      "nombre" : "Sexto"    
    }

];
const annosSecundaria = [
{
"id" : 7,
"nombre" : "Sétimo"    
},
{
"id" : 8,
"nombre" : "Ocatavo"    
},
{
"id" : 9,
"nombre" : "Noveno"    
},
{
"id" : 10,
"nombre" : "Décimo"    
},
{
"id" : 11,
"nombre" : "Undécimo"    
},
{
"id" : 12,
"nombre" : "Duodécimo"    
}

];

function GrupoCheck(props) {
  
  return(
    
      <React.Fragment>
        {
          (props.nivel === "1" ) &&
          (
        <div className="row">
          <div className="col-12">
          <div className="pretty p-default p-round p-thick">
            <input type="checkbox" />
            <div className="state p-primary-o">
                <label>Primero</label>
            </div>
          </div>

          <div className="pretty p-default p-round p-thick">
            <input type="checkbox" />
            <div className="state p-primary-o">
                <label>Segundo</label>
            </div>
          </div>

          </div>
        </div>
          )
        }
             {
          (props.nivel === "2") &&
          (
            <div className="pretty p-default p-round p-thick">
            <input type="checkbox" />
            <div className="state p-primary-o">
                <label>Sétimo</label>
            </div>
          </div>
          )
        }
      </React.Fragment>
    
  )
}


export default GrupoCheck;