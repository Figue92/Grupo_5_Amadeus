import React from 'react'
import PropTypes from 'prop-types'
import { } from "../../assets/css/styles.css";
import { EditProduct } from './EditProduct';
import { DeleteProduct } from './DeleteProduct';
import { ViewDetailProduct } from './ViewDetailProduct';


export default function NuevosProductos({ id, name, price, category, brand, discount, novelty }) {

    return (

        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{price}</td>
            <td>
                {category?.nameCategory}
            </td>
            <td>{brand?.name}</td>
            <td>{discount}</td>
            <td>{novelty ? 'Sí' : 'No'}</td>

            <td>
                <div className="containerButons">
                    <ViewDetailProduct></ViewDetailProduct>
                    <EditProduct></EditProduct>
                    <DeleteProduct></DeleteProduct>

                </div>
            </td>

        </tr >

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
