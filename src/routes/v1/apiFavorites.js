const router = require('express').Router();
const { getFavorites,toggleProductFavorite } = require('../../controllers/api/favoritesApiController');


router
.get('/',getFavorites)
.post('/toggle', toggleProductFavorite)

module.exports = router;