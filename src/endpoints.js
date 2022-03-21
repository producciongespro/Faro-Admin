const endpoints = {
    login: `${process.env.REACT_APP_URL_API}login.php`, 
    assets:   `${process.env.REACT_APP_ASSETS}`, 
    getODP: `${process.env.REACT_APP_URL_API}obtener_oferta_desarrollo.php`,
    getSubODP: `${process.env.REACT_APP_URL_API}obtener_sub_categorias_odp.php`,
    getPoblacionesIDP: `${process.env.REACT_APP_URL_API}obtener_poblaciones_idp.php`    

    


      
}
export default endpoints;