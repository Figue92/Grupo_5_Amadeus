
const router = require('express').Router();


const {removeProduct, addProduct, moreQuantity, lessQuantity, clearCart, getOrderPending, statusOrder} = require('../../controllers/api/cartController')

router
.get('/getOrderPending', getOrderPending)
.post('/addProduct', addProduct)
.delete('/removeProduct', removeProduct)
.put('/moreQuantity', moreQuantity)
.put('/lessQuantity', lessQuantity)
.delete('/clearCart', clearCart)
.put('/statusOrder', statusOrder)

module.exports = router;