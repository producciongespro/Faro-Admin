import React  from 'react';
import botones from '../data/menu-botones.json';

function Menu (props) {   
    return (
        <React.Fragment>
            {
                botones.map((item, i)=>(
                    <button onClick={props.handleCargarComponentes} value={i}  className="btn btn-outline-info btn-block" key={"btn"+i} >  {item.nombre}  </button>
                ))
            }
        </React.Fragment>
    )
}

export default Menu;