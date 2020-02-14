function filtrar (array, criterio, valorCriterio ) {
    console.log("Filtro por criterio", criterio);
    if (array.length > 0) {
        const limite = array.length;
        var tmpData = [];
        for (let index = 0; index < limite; index++) {
            if (valorCriterio === array[index][criterio]) {
                tmpData.push(array[index]);
            }
        }                 
    }
    return tmpData;
}

export default filtrar;