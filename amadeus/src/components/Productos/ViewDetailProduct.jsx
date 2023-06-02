import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, React } from 'react'
import { UseFetch } from '../../hooks/UseFetch'



export const ViewDetailProduct = ({id}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const [productState, setProductState] = useState({
        loading: true,
        productos: [],
        pages: null,
        currentPage: null
    
      });
        useEffect(() => {
          UseFetch(`/productos/${id}`)
            .then(({ ok, data }) => {
             
              const { productos } = data;
              setProductState({
                loading: false,
                productos: data.productos,
             
              })
            })
            .catch(error => console.error)
        }, []);

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
