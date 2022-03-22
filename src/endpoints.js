const endpoints = {
    login: `${process.env.REACT_APP_URL_API}login.php`, 
    assets:   `${process.env.REACT_APP_ASSETS}`, 
    getODP: `${process.env.REACT_APP_URL_API}obtener_oferta_desarrollo.php`,
    getSubODP: `${process.env.REACT_APP_URL_API}obtener_sub_categorias_odp.php`,
    getPoblacionesIDP: `${process.env.REACT_APP_URL_API}obtener_poblaciones_idp.php`,   
    getBotonesMenu: `${process.env.REACT_APP_URL_API}obtener_menu_botones.php`,
    getBitacora: `${process.env.REACT_APP_URL_API}obtener_bitacora2.php?tabla=`
    

    


    


      
}
export default endpoints;