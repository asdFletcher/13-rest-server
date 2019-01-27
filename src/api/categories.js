'use strict';

const express = require('express');

const Categories = require('../models/categories.js');
const categories = new Categories();
const router = express.Router();

const categoriesHandlers = require('./categoriesHandlers');

const getCategories = categoriesHandlers.getCategories;
const getCategory = categoriesHandlers.getCategory;
const postCategories = categoriesHandlers.postCategories;
const putCategories = categoriesHandlers.putCategories;
const deleteCategories = categoriesHandlers.deleteCategories;


// ROUTES
router.get('/api/v1/categories', getCategories);
router.post('/api/v1/categories', postCategories);

router.get('/api/v1/categories/:id', getCategory);
router.put('/api/v1/categories/:id', putCategories);
router.delete('/api/v1/categories/:id', deleteCategories);



module.exports = router;
