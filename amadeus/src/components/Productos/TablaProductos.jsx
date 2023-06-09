import { React, useState, useEffect } from 'react'
import NuevosProductos from '../Productos/NuevosProductos'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddProduct from './AddProduct';
import { UseFetch } from '../../hooks/UseFetch'
import { useFormik } from "formik";
import validate from "../../validations/addProductValidator";



export const TablaProductos = ({ productos, loading, pages, currentPage, handleGetPage, handleAdd, handleUpdate, handleEdit }) => {
  const paginator = [];
  for (let i = 1; i <= pages; i++) {
    paginator.push(i)

  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  const [producto, setProducto] = useState(null)
  /* const handleEdit = (id) => {
     id ? UseFetch(`/productos/${id}`)
       .then(({ ok, data }) => {
         ok && setProducto(data.producto)
       })
       .catch(() => console.error)
       : setProducto(null)
   }
  */
  /* const handleUpdate = (formdata) => {
    if(producto && producto.id){
      UseFetch(`/productos/${producto.id}`, 'PATCH', formdata)
      .then(({ ok }) => {
        if (ok) {
          setProducto(null)
          handleGetPage(state.currentPage)

        }
      })
    }

  }
 */

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
      linkVideo: '',
      novelty: false

    },
    validate,
    onSubmit: (values) => {
      let data = new FormData();
      for (const key in values) {
        data.append(key, values[key])
      }
      handleAdd(data)
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


            <AddProduct
              productos={categoryState.productos}
              categories={categoryState.categories}
              brands={brandState.brands}
              loading={categoryState.loading}
              handleClose={handleClose}
              handleAdd={handleAdd} />



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
                (productos.map(producto => (<NuevosProductos key={producto.id} producto={producto} handleEdit={handleEdit} handleUpdate={handleUpdate} setProducto={{ setProducto }} />)))
            }


          </tbody>
        </table>
      </div >
    </>
  )
}
TablaProductos.propTypes = {
  productos: PropTypes.array,
  producto: PropTypes.object,
  pages: PropTypes.number,
  currentPage: PropTypes.number,
  handleGetPage: PropTypes.func,
  handleAdd: PropTypes.func,
  handleEdit: PropTypes.func,

}

