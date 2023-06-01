import { React, useState, useEffect } from 'react'
import NuevosProductos from './NuevosProductos'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddProduct from './AddProduct';
import { UseFetch } from '../hooks/UseFetch'
import { useFormik } from "formik";
import validate  from "../validations/addProductValidator";



export const TablaProductos = ({ productos, brands, categories, loading, pages, currentPage, handleGetPage }) => {
  const paginator = []
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
    onSubmit : (values) => {
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
            <AddProduct productos={categoryState.productos} categories={categoryState.categories} brands={brandState.brands} loading={categoryState.loading} />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={formik.handleReset}>
              Close
            </Button>
            <Button type="submit" onClick={formik.handleSubmit}>
             Submit
           </Button>
          </Modal.Footer>
        </Modal>

      </div >
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-sm">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>

          {
            paginator.map(page => (
              <li key={page} className={`page-item${page === currentPage && 'active'}`}><a className="page-link" href="#" onClick={() => handleGetPage(page)}>{page}</a></li>
            ))
          }

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
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
                (productos.map(producto => (<NuevosProductos key={producto.id} {...producto} brand={brands.find(brand => brand.id === producto.idBrand)} />)))
            }


          </tbody>
        </table>
      </div >
    </>
  )
}
TablaProductos.propTypes = {
  productos: PropTypes.array,
  brands: PropTypes.array,
  pages: PropTypes.number,
  currentPage: PropTypes.number,
  handleGetPage: PropTypes.func.isRequired
}




