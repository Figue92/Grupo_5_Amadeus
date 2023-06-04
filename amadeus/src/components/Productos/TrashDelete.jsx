import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteProduct } from './DeleteProduct';
import { UseFetch } from '../../hooks/UseFetch'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2';



export const TrashDelete = ({id,name}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)


    const handleDelete = () => {
        UseFetch(`/productos/${id}`, 'DELETE')
          .then((ok) => {
            if (ok) {
              return Swal.fire({
                icon: 'success',
                title: 'Producto eliminado con éxito!',
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
          .then(() => {
            handleClose();
          })
          .catch((error) => {
            console.error('Error al eliminar el producto:', error);
          });
      };

    return (
        <>
            <div className='d-flex justify-content-between'>
                <Button variant="danger" onClick={handleShow}>
                    <i className="fas fa-trash"></i>
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>

                        <Modal.Title>Confirmación</Modal.Title>

                    </Modal.Header>

                    <Modal.Body> 
                       
                    <DeleteProduct id={id} name={name} handleDelete={handleDelete} />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Sí, eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div >
        </>
    )
}
TrashDelete.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string
  }