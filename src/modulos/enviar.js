const axios = require('axios');

function enviar(url, data, cb) {
  data.apoyo=+data.apoyo; 
  console.log("data a enviar", data); 
  axios.post(url, data)
    .then((response) => {
        //console.log(response);
        console.log(response.data );
        cb(response.data);
    }, (error) => {
        console.log( "error->", error );      
        cb(error.message );
    });
}

export default enviar;