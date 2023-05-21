import React from 'react'
import PropTypes from 'prop-types'

export default function NuevosProductos({ id, name, price, category, brand, discount, novelty }) {
    return (
 
            <tr>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{price}</td>
                <td>{category}</td>
                <td>{brand}</td>
                <td>{discount}</td>
                <td>{novelty ? 'Sí' : 'No'}</td>

                <td>
                    <div className="containerButons">
                        <a className="butonVerProd" href="/productos/productDetail/${id}"><i className="far fa-eye"></i></a>
                        <a className="butonEditarProd" href="/productos/edit/${id}"><i className="far fa-edit"></i></a>


                        <form className="formAdd__form--eliminar" action="/productos/delete/${id}?_method=DELETE" method="POST">
                            <button type="button" className="butonEliminarProd" data-producto-id="${id}"><i className="fas fa-trash"></i></button>
                        </form>
                    </div>
                </td>

          </tr>
      
    )
}
NuevosProductos.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    brand: PropTypes.string,
    discount: PropTypes.number,
    novelty: PropTypes.bool,
}
