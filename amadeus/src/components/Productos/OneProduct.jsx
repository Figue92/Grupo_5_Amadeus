import { React, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const OneProduct = ({ id, name, description, price, image, category, brand, discount }) => {
  console.log({ id, name, description, price, image });

  const [state, setState] = useState({
    loading: true,
    producto: []

  });
  useEffect(() => {
    UseFetch(`/productos/${id}`)
      .then(({ ok, data }) => {
    
        const { producto } = data;
        setProductState({
          loading: false,
          producto: state.producto,
          
        })
      })
      .catch(error => console.error)
  }, []);

  return (
    <div className="col-lg-12 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <small>SKU:{id}</small>
          <h5 className="m-0 font-weight-bold text-gray-800">{name}</h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "10rem" }} src={image[0].urlImage} alt="Imagen" />
          </div>
          <p>{description}</p>
          <div className='d-flex row col-lg-10 justify-content-between'>
            <div className="d-flex align-items-between">
              <h6 className="font-weight-bold">Precio: </h6> <span>${price}</span>  </div>
            <div className="d-flex align-items-between">
              <h6 className="font-weight-bold">Descuento: </h6>
              <span>{discount}%</span>
            </div>

            <div className="d-flex align-items-between">
              <h6 className="font-weight-bold">Categoría: </h6>
              <span> {category}</span>
            </div>
            <div className="d-flex align-items-between">
              <h6 className="font-weight-bold">Marca: </h6>
              <span> {brand}</span>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}
OneProduct.propTypes = {
  productos: PropTypes.array
}
