function obtener(url, cb ) {

    fetch(url, cb )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //console.log(json);
      cb(json);
    })
    .catch(function(err) {
       console.log("Error:", err);       
      });

}


export default obtener;