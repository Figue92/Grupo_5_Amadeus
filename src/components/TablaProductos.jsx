import React from 'react'
import NuevosProductos from './NuevosProductos'
import PropTypes from 'prop-types'

export default function TablaProductos({ id, name, price, category, brand, discount, novelty }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Descuento</th>
                    <th scope="col">Novedad</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row">{id}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{category}</td>
                    <td>{brand}</td>
                    <td>{discount}</td>
                    <td>{novelty}</td>

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
            </tbody>
        </table>

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

