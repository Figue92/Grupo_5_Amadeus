import React from 'react'
import PropTypes from 'prop-types'

export const DeleteProduct = ({ id, name }) => {
  return (
    <div>
      ¿Estás seguro de eliminar el producto {name}?
      Esta acción no puede revertirse...
    </div>
  )
}

DeleteProduct.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string
}