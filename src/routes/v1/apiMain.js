
const router = require('express').Router();
const { metrics, search } = require('../../controllers/api/mainApiController');


router
    .get('/metrics',metrics)
    .get('/search', search)

module.exports = router;