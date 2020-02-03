import React  from 'react';
import botones from '../data/menu-botones.json';

console.log(botones);


function Menu () {
    

    return (
        <React.Fragment>
            {
                botones.map((item, i)=>(
                    <button className="btn btn-outline-info btn-block" key={"btn"+i} >  {item.nombre}  </button>
                ))
            }
        </React.Fragment>
    )
}

export default Menu;