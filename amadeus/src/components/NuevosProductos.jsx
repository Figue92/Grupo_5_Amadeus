import React from 'react'
import PropTypes from 'prop-types'
import {  } from "../assets/css/styles.css";


export default function NuevosProductos({ id, name, price, category,brand, discount, novelty }) {
    console.log(brand)
    return (
 
            <tr>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{price}</td>
                <td>
                {category.nameCategory}
            </td>
                <td>{brand?.name}</td>
                <td>{discount}</td>
                <td>{novelty ? 'Sí' : 'No'}</td>

                <td>
                    <div className="containerButons">
                        <button className="butonVerProd" to="/productos/productDetail/{id}"><i className="far fa-eye"></i></button>
                        <button className="butonEditarProd" href="/productos/edit/${id}"><i className="far fa-edit"></i></button>


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
    category: PropTypes.object,
    brand: PropTypes.object,
    discount: PropTypes.number,
    novelty: PropTypes.bool,
}
