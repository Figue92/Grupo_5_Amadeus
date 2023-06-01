const validate = (values) => {
    const errors = {}
    if(!values.name) {
        errors.name = "Ingresar nombre del producto"
    }
    if(!values.brands) {
        errors.brands = "Seleccionar marca"
    }
    if(!values.category) {
        errors.category = "Seleccionar categoría"
    }
    if(!values.price) {
        errors.price = "Ingresar precio del producto"
    }
    if(!values.discount) {
        errors.discount = "Ingresar descuento del producto"
    }
    if(!values.description) {
        errors.description = "Ingresar descripcion del producto"
    }
    return errors
}
export default validate