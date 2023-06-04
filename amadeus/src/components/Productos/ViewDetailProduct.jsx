import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, React } from 'react'
import { UseFetch } from '../../hooks/UseFetch'
import { OneProduct } from './OneProduct';
import PropTypes from 'prop-types'



export const ViewDetailProduct = () => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    
    
      useEffect(() => {
        fetch(`http://localhost:3000/api/productos/${id}`)
            .then(response => {

                return response.json()

            })
            .then(({ ok, data }) => {

                if (ok) {
                    const { producto } = data;
                    setState({
                        ...state,
                        producto: {
                            ...state.producto
                        },

                    });
                }
            }).catch(error => console.log(error))


    }, [])

    return (
        <>
            <div className='d-flex justify-content-between'>
        <Button variant="primary" onClick={handleShow}>
          <i className="far fa-eye"></i>
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>

            <Modal.Title>Detalle del Producto</Modal.Title>
          </Modal.Header>

          <Modal.Body>

<OneProduct {...state.producto}/>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>

      </div >
        </>
    )
}

