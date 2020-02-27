function filtrar (array, llave, valor ) {    
    
    console.log("*********Filtro por criterio llave", llave);    
    console.log("******Valor de la llave", valor );
    
    console.log("aaray recibido para filtrar", array);         
    
    if (array.length > 0) {
        const limite = array.length;
        var tmpData = [];
        for (let index = 0; index < limite; index++) {            
                if ( array[index][ llave ] === valor  ) {
                    tmpData.push(array[index]);
                }              
        }                 
    }
    console.log("Arreglo retornado", tmpData);    
    return tmpData;
}

export default filtrar;