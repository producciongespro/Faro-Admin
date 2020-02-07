
  const obtenerValoresCheck =(nombre)=>{
    let listaAnnos = [];
    const chk  = document.getElementsByName(nombre);
    for (let index = 0; index < chk.length; index++) {
      const anno = { [chk[index].value] : chk[index].checked  }
      listaAnnos.push(anno);      
    }
    return JSON.stringify(listaAnnos);
  }

export default obtenerValoresCheck;