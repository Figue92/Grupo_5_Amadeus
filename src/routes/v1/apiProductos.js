
const router = require('express').Router();
const {list,detail,store,update,destroy, newest, offer} = require('../../controllers/api/productosApiController');
const productosValidator = require('../../validations/productosValidator')


// /api
router
.get('/',list)
.get('/newest', newest)
.get('/offer', offer)
.get('/:id',detail)
.post('/', productosValidator,store)
.put('/:id',update)
.delete('/:id',destroy)


module.exports = router;