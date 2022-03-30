const endpoints = {
    login: `${process.env.REACT_APP_URL_API}login.php`, 
    assets:   `${process.env.REACT_APP_ASSETS}`, 
    
    insertODP: `${process.env.REACT_APP_URL_API}registrar_odp.php`, 
    updateODP: `${process.env.REACT_APP_URL_API}actualizar_odp.php`, 
    
    
    getODP: `${process.env.REACT_APP_URL_API}obtener_oferta_desarrollo.php`, 
    getSubODP: `${process.env.REACT_APP_URL_API}obtener_sub_categorias_odp.php`,
    getPoblacionesIDP: `${process.env.REACT_APP_URL_API}obtener_poblaciones_idp.php`,   
    getBotonesMenu: `${process.env.REACT_APP_URL_API}obtener_menu_botones.php`,
    getBitacora: `${process.env.REACT_APP_URL_API}obtener_bitacora.php?tabla=`,
    getODPBorrados: `${process.env.REACT_APP_URL_API}obtener_odp_borrado.php`,

    getODPBorrados: `${process.env.REACT_APP_URL_API}obtener_odp_borrado.php`,
    recuperarODPBorrado: `${process.env.REACT_APP_URL_API}recuperar_odp_borrado.php`,
    getRecursosBorrados: `${process.env.REACT_APP_URL_API}obtener_recursos_borrados.php`,
    recuperarRecursoBorrado: `${process.env.REACT_APP_URL_API}recuperar_recurso.php`,
    delODP: `${process.env.REACT_APP_URL_API}eliminar_odp.php`

    
    

    


    


      
}
export default endpoints;