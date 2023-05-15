import React from 'react'
import PropTypes from 'prop-types'

export default function NuevosProductos({ id, name, price, category, brand, discount, novelty }) {
    return (
        <div>
            <tr>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{price}</td>
                <td>{category}</td>
                <td>{brand}</td>
                <td>{discount}</td>
                <td>{novelty}</td>
            </tr>
        </div>
    )
}
NuevosProductos.propTypes ={
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    brand: PropTypes.string,
    discount: PropTypes.number,
    novelty: PropTypes.bool,
}
