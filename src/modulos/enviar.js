const axios = require('axios');





function enviar(url, data) {
  axios.post(url, data)
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

}

export default enviar;