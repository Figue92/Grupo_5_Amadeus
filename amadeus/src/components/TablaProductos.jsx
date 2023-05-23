import { React, useState, useEffect } from 'react'
import NuevosProductos from './NuevosProductos'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddProduct from './AddProduct';
import { UseFetch } from '../hooks/UseFetch'



export const TablaProductos = ({ productos, brands, categories,loading }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  const [categoryState, setCategoryState] = useState({
    loading: true,
    categories: []
  });
  useEffect(() => {
    UseFetch('/categorias')
      .then(({ ok, data }) => {

        const { categories } = data;
        setCategoryState({
          loading: false,
          productos: productState.productos,
          categories
        })
      })
      .catch(error => console.error)
  }, []);
  const [brandState, setBrandState] = useState({
    loading: true,
    brands: []
  });
  useEffect(() => {
    UseFetch('/marcas')
      .then(({ ok, data }) => {

        const { brands } = data;
        setBrandState({
          loading: false,
          productos: productState.productos,
          categories: categoryState.categories,
          brands
        })
      })
      .catch(error => console.error)
  }, []);
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h4>Lista de productos</h4>
        <Button variant="primary" onClick={handleShow}>
          <i className="fa-solid fa-plus"></i>
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <AddProduct productos={categoryState.productos} categories={categoryState.categories} brands={brandState.brands}loading={categoryState.loading} />

          </Modal.Body>
       
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div >
      <hr />

      <div className='table-responsive'>
        <table className="table table-striped">
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
            
             {
            loading ?
            
            <tr>
                <td>
                Cargando...
                </td>
                </tr> :
            (productos.map(producto=> (<NuevosProductos key={producto.id} {...producto} brand={brands.find(brand =>brand.id === producto.idBrand)}/>)))
              }
                      
                
            </tbody>
        </table>
</div >
</>
    )
}
TablaProductos.propTypes = {
  productos: PropTypes.array,
  brands: PropTypes.array
}




