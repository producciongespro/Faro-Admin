
  const obtenerValoresCheck =(nombre)=>{
    /*
     Obtiene los chechk con el nombre recibido en el parametro
     y extrae en una lista los que tienen la propiedad check = true
     */
    

    let listaAnnos = [];
    const chk  = document.getElementsByName(nombre);
    //console.log("chk",chk);
    
    for (let index = 0; index < chk.length; index++) {
      //const anno = { [chk[index].value] : chk[index].checked  }      
      if (chk[index].checked) {        
        listaAnnos.push([chk[index].value]); 
      }           
    }
    //console.log("listaAnnos", listaAnnos);
    
    return (listaAnnos.toString()  );
  }

export default obtenerValoresCheck;