import { React, useState, useEffect } from 'react'
import NuevosProductos from './NuevosProductos'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddProduct from './AddProduct';
import { UseFetch } from '../hooks/UseFetch'
import { useFormik } from "formik";
import validate from "../validations/addProductValidator";



export const TablaProductos = ({ productos,brands, loading, pages, currentPage, handleGetPage }) => {
  const paginator = [];
  for (let i = 1; i <= pages; i++) {
    paginator.push(i)

  }
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

        const {categories} = data;
        setCategoryState({
          loading: false,
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
        console.log({data});
        const brands = data.brands;
        setBrandState({
          loading: false,
          brands
        })
      })
      .catch(error => console.error)
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      brand: '',
      category: '',
      price: '',
      discount: 0,
      description: '',
      onSale: false,
      isNew: false

    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    }
  })
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
            <form className="row" onSubmit={formik.handleSubmit}>

              <AddProduct
                productos={categoryState.productos}
                categories={categoryState.categories}
                brands={brandState.brands}
                loading={categoryState.loading} />
              <button className="btn btn-primary my-1" type="submit">
                Guardar
              </button>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>

      </div >

      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-sm">
          {currentPage != 1 && (
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous" onClick={() => handleGetPage(currentPage - 1)}>


                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
          )}
          {
            paginator.map(page => (
              <li key={page}
                className={`page-item${page === currentPage && 'active'}`}>
                <a className="page-link" href="#" onClick={() => handleGetPage(page)}>{page}</a></li>
            ))
          }
          {currentPage != pages && (
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={() => handleGetPage(currentPage + 1)}>
                <span aria-hidden="true">&raquo;</span>

              </a>
            </li>
          )}

        </ul>
      </nav>
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
                (productos.map(producto => (<NuevosProductos key={producto.id} {...producto}/>)))
            }


          </tbody>
        </table>
      </div >
    </>
  )
}
TablaProductos.propTypes = {
  productos: PropTypes.array,
  pages: PropTypes.number,
  currentPage: PropTypes.number,
  handleGetPage: PropTypes.func
}




