
const router = require('express').Router();
const {list,detail,store,update,destroy, newest, offer, storeImage} = require('../../controllers/api/productosApiController');
const { uploadImages } = require('../../middlewares/upload');
const productosValidator = require('../../validations/productosValidator')


// /api
router
.get('/',list)
.get('/newest', newest)
.get('/offer', offer)
.get('/:id',detail)
.post('/', productosValidator,store)

.delete('/:id',destroy)
.post('/productos', uploadImages.fields([
    {name: 'image_1'},
    {name: 'image_2'},
    {name: 'image_3'},
]), storeImage)
.patch('/:id', uploadImages.fields([
    {name : 'image_1'},
    {name : 'image_2'},
    {name : 'image_3'},
]), update)


module.exports = router;