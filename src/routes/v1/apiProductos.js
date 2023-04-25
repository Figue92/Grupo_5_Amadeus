
const router = require('express').Router();
const {list,detail,store,update,destroy} = require('../../controllers/api/productosApiController');
const productosValidator = require('../../validations/productosValidator')


// /api
router
.get('/',list)
.get('/:id',detail)
.post('/', productosValidator,store)
.put('/:id',update)
.delete('/:id',destroy)

module.exports = router;