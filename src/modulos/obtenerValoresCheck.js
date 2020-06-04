
  const obtenerValoresCheck =(nombre)=>{
    let listaAnnos = [];
    const chk  = document.getElementsByName(nombre);
    console.log("chk",chk);
    
    for (let index = 0; index < chk.length; index++) {
      //const anno = { [chk[index].value] : chk[index].checked  }      
      if (chk[index].checked) {        
        listaAnnos.push([chk[index].value]); 
      }           
    }
    console.log("listaAnnos", listaAnnos);
    
    return (listaAnnos.toString()  );
  }

export default obtenerValoresCheck;