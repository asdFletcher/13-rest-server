'use strict';

const express = require('express');
const util = require('util');
const Products = require('../models/products.js');
const products = new Products();

const router = express.Router();

const productsHandlers = require('./productsHandlers');
const getProducts = productsHandlers.getProducts;
const getProduct = productsHandlers.getProduct;
const postProducts = productsHandlers.postProducts;
const putProducts = productsHandlers.putProducts;
const deleteProducts = productsHandlers.deleteProducts;

// ROUTES
router.get('/api/v1/products', getProducts);
router.post('/api/v1/products', postProducts);

router.get('/api/v1/products/:id', getProduct);
router.put('/api/v1/products/:id', putProducts);
router.delete('/api/v1/products/:id', deleteProducts);


module.exports = router;
