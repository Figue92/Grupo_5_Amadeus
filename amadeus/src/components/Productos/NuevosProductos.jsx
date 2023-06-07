import { useState, React, useEffect } from 'react'
import PropTypes from 'prop-types'
import { } from "../../assets/css/styles.css";
import { EditProduct } from './EditProduct';
import { OneProduct } from './OneProduct';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TrashDelete } from './TrashDelete';
import { useFormik } from "formik";
import validate from "../../validations/addProductValidator";
import { UseFetch } from '../../hooks/UseFetch';


export default function NuevosProductos({ producto, handleEdit, handleUpdate, setProducto }) {
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
    
    console.log(producto);
    
      const {
        id,
        name,
        category,
        brand,
        price,
        discount,
        description,
        linkVideo,
        novelty,
        image: [image_1, image_2, image_3]
    
      } = producto
    
      const formik = useFormik({
        initialValues: {
          name,
          idBrand : brand.id,
          idCategory : category.id,
          price,
          discount,
          description,
          linkVideo,
          novelty,
          image_1: image_1 ? image_1.urlImage : null,
          image_2: image_2 ? image_2.urlImage : null,
          image_3: image_3 ? image_3.urlImage : null,
          image_1_id: image_1 ? image_1.id : null,
          image_2_id: image_2 ? image_2.id : null,
          image_3_id: image_3 ? image_3.id : null
    
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
          formik.setFieldValue(field, field === "idBrand" ? brand.id  : field === "idCategory" ? category.id  : producto[field], false)
    
        })
        formik.setFieldValue("image_1", image_1 ? image_1.urlImage : null)
        formik.setFieldValue("image_2", image_2 ? image_2.urlImage : null)
        formik.setFieldValue("image_3", image_3 ? image_3.urlImage : null)
        formik.setFieldValue("image_1_id", image_1 ? image_1.id : null)
        formik.setFieldValue("image_2_id", image_2 ? image_2.id : null)
        formik.setFieldValue("image_3_id", image_3 ? image_3.id : null)
      }, [producto])
    

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
                 <EditProduct formik={formik} brandState={brandState} categoryState={categoryState}/>
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