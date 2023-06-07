import { useState, React } from 'react'
import PropTypes from 'prop-types'
import { } from "../../assets/css/styles.css";
import { EditProduct } from './EditProduct';
import { OneProduct } from './OneProduct';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TrashDelete } from './TrashDelete';


export default function NuevosProductos({ producto, handleEdit, handleUpdate, setProducto }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

 const {
id,
name,
price,
discount,
category,
brand,
description,
novelty

 } = producto
    

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
                    <div className='d-flex justify-content-between'>
                        <Button variant="primary" onClick={handleShow}>
                            <i className="far fa-eye"></i>
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <div className='col-lg-12'>
                                <Modal.Header closeButton>

                                    <Modal.Title>Detalle del Producto</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <OneProduct {...producto}/>


                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="success" onClick={handleClose}>
                                        Volver
                                    </Button>

                                </Modal.Footer>
                            </div>
                        </Modal>

                    </div >
                 <EditProduct
                 producto={producto} setProducto={setProducto} handleEdit={handleEdit}/>
                    <TrashDelete id={id} name={name}/>

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
    productos: PropTypes.array,
    updProducto: PropTypes.object,
    handleEdit: PropTypes.func

}