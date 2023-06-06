const validate = (values) => {
    const errors = {};
    if(!values.name) {
        errors.name = "Ingresar nombre del producto"
    }
    if(!values.idBrand) {
        errors.idBrand = "Seleccionar marca"
    }
    if(!values.idCategory) {
        errors.idCategory = "Seleccionar categoría"
    }
    if(!values.price || values.price < 1) {
        errors.price = "Ingresar precio del producto"
    }
    if(!values.description) {
        errors.description = "Ingresar descripcion del producto"
    }
      if(!values.linkVideo) {
        errors.linkVideo = "Ingresar link del video del producto"
    }
    return errors
}
export default validate