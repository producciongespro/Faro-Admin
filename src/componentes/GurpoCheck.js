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
    "nombre": "Ocatavo"
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

function GrupoCheck(props) {

  return (

    <div className="row my-2">
      <div className="col-12">    
      {
        (props.nivel === "1") &&
        (
          annosPrimaria.map((item, i) => (
            <div key={"primaria"+i} className="pretty p-default">
              <input type="checkbox" value={item.id} />
              <div className="state p-primary">
                <label>{item.nombre}</label>
              </div>
            </div>
          ))
        )
      }
      {
        (props.nivel === "2") &&
        (
          annosSecundaria.map((item, i) => (
            <div key={"primaria"+i} className="pretty p-default">
              <input type="checkbox" value={item.id} />
              <div className="state p-primary">
                <label>{item.nombre}</label>
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