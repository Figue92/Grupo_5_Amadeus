
const router = require('express').Router();
const { metrics } = require('../../controllers/api/mainApiController');


router.get('/',metrics)