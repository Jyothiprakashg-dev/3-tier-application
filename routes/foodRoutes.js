const express = require('express');
const router = express.Router();
const { getAllFoods, createFood } = require('../controllers/foodController');

router.get('/', getAllFoods);
router.post('/', createFood);

module.exports = router;
