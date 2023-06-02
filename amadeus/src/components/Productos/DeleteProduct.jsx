import { useState, useEffect } from "react";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export const DeleteProduct = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    return (
        <>
            <div className='d-flex justify-content-between'>
                <Button variant="danger" onClick={handleShow}>
                    <i className="fas fa-trash"></i>
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>

                        <Modal.Title>¿Deseas eliminar el Producto?</Modal.Title>

                    </Modal.Header>

                    <Modal.Body> <div> Esta acción no puede revertirse...</div>
                       
                       
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="" variant="danger" onClick={handleShow}>
                            Sí, eliminar!
                        </Button>


                    </Modal.Footer>
                </Modal>

            </div >
        </>
    )
}
