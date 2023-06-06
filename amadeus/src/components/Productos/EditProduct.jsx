import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import validate from "../../validations/addProductValidator";
import { UseFetch } from '../../hooks/UseFetch'
import { EditImageProduct } from "./EditImageProduct";
import { PropTypes } from "prop-types";



export const EditProduct = ({updProducto, handleEdit, handleUpdate}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

const [productState, setProductState] = useState([]);
  useEffect(() => {
    UseFetch('/productos?withPagination=false')
      .then(({ ok, data }) => {
        const { productos } = data;
        setProductState({
          productos
        })
      })
      .catch(error => console.error)
  }, []);

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

        const { brands } = data;
        setBrandState({
          loading: false,
          brands
        })
      })
      .catch(error => console.error)
  }, []);


  
  const [setProductoEditado, setEditProducto] = useState(null)

  const {
    name,
    idBrand,
    idCategory,
    price,
    discount,
    description,
    linkVideo,
    novelty,
    image: [image_1, image_2, image_3]

  } = updProducto

  const formik = useFormik({
    initialValues: {
      name,
      idBrand,
      idCategory,
      price,
      discount,
      description,
      linkVideo,
      novelty,
      image_1: image_1 ? image_1.urlImage : null,
      image_2: image_2 ? image_2.urlImage : null,
      image_3: image_3 ? image_3.urlImage : null

    },
    validate,
    onSubmit: (values) => {
      let data = new FormData();
      for (const key in values) {
        data.append(key, values[key])
        handleClose()
      }
      handleUpdate(data)

    }
  })
 
  useEffect(() => {
    const fields = [
      "name",
      "idBrand",
      "idCategory",
      "price",
      "discount",
      "description",
      "linkVideo",
      "novelty"
    ]

    fields.forEach(field => {
      formik.setFieldValue(field, updProducto[field], false)

    })
    formik.setFieldValue("image_1", image_1 ? image_1.urlImage : null)
    formik.setFieldValue("image_2", image_2 ? image_2.urlImage : null)
    formik.setFieldValue("image_3", image_3 ? image_3.urlImage : null)
  }, [setProductoEditado])


 
  return (
    <>
      <div className='d-flex justify-content-between'>
        <Button variant="success" onClick={handleShow}>
          <i className="fa-solid fa-edit"></i>
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>

            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <form className="row" onSubmit={formik.handleSubmit}>
              <div className="col-12 mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre *
                </label>
                <input
                  type="text"
                  className={`form-control 
            ${formik.errors.name
                      ? "is-invalid"
                      : null}`}
                  name="name" value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {
                  <small className="text-danger">{formik.errors.name}</small>
                }
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="idBrand" className="form-label">
                  Marca *
                </label>
                <select
                  className={`form-control 
                  ${formik.errors.idBrand
                      ? "is-invalid"
                      : null}`}
                  name="idBrand"
                  value={formik.values.idBrand}
                  onChange={formik.handleChange}
                >
                  <option hidden defaultValue value="">Seleccione...</option>
                  {brandState.loading ? (
                    <option disabled>Cargando marcas...</option>
                  ) : (
                    brandState.brands.map((brand, index) => (
                      <option value={brand.id} key={index}>{brand.name}</option>
                    ))
                  )}
                </select>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="idCategory" className="form-label">
                  Categoría *
                </label>
                <select className={`form-control ${formik.errors.idCategory ? "is-invalid" : null}`} name="idCategory" value={formik.values.nameCategory}
                  onChange={formik.handleChange}
                >
                  <option hidden defaultValue value="">Seleccione...</option>
                  {categoryState.loading ? (
                    <option disabled>Cargando categorías...</option>
                  ) : (
                    categoryState.categories.map((category, index) => (
                      <option value={category.id} key={index}>
                        {category.nameCategory}</option>
                    ))
                  )}
                </select>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="price" className="form-label">
                  Precio *
                </label>
                <input
                  type="number"
                  className={`form-control ${formik.errors.price ? "is-invalid" : null}`}
                  name="price" value={formik.values.price}
                  onChange={formik.handleChange}

                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="discount" className="form-label">
                  Descuento
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="discount"
                  value={formik.values.discount}
                  onChange={formik.handleChange}

                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="description" className="form-label">
                  Descripción *
                </label>
                <textarea
                  className={`form-control ${formik.errors.description ? "is-invalid" : null}`}
                  name="description"
                  style={{ resize: "none" }}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                ></textarea>
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="linkVideo" className="form-label">
                  Link Video Review
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="linkVideo" value={formik.values.linkVideo}
                  onChange={formik.handleChange}
                />
                {
                  <small className="text-danger">{formik.errors.name}</small>
                }
              </div>
              <div className="col-12 mb-3">
                <div className="d-flex justify-content-around">
                  <div className="form-check form-switch">
                    <input className="form-check-input" name="free" type="checkbox" role="switch"
                      id="onSale" checked={formik.values.onSale}
                      onChange={formik.handleChange} />
                    <label htmlFor="onSale" className="form-check-label">En oferta</label>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" name="isNew" type="checkbox" role="switch"
                      id="isNew" checked={formik.values.isNew}
                      onChange={formik.handleChange} />
                    <label htmlFor="isNew" className="form-check-label" >Nuevo</label>
                  </div>
                </div>

              </div>
              <div className="row">
                <label htmlFor="">Imágenes</label>
                <div className="col-4 mb-4">
                  <div className="d-flex justify-content-between gap-5">
                    <EditImageProduct
                      file={formik.values.image_1}
                      setFieldValue={formik.setFieldValue}
                      name={"image_1"}
                      main={true}
                    />
                    <EditImageProduct
                      file={formik.values.image_2}
                      setFieldValue={formik.setFieldValue}
                      name={"image_2"}
                      main={false}
                    />
                    <EditImageProduct
                      file={formik.values.image_3}
                      setFieldValue={formik.setFieldValue}
                      name={"image_3"}
                      main={false}
                    />


                  </div>
                </div>
              </div>

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
    </>
  )
}
EditProduct.propTypes = {
  handleUpdate : PropTypes.func,
  updProducto: PropTypes.object,
  handleEdit: PropTypes.func
}