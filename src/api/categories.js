'use strict';

const express = require('express');

const Categories = require('../models/categories.js');
const categories = new Categories();

const router = express.Router();

// ROUTES
router.get('/api/v1/categories', getCategories);
router.post('/api/v1/categories', postCategories);

router.get('/api/v1/categories/:id', getCategory);
router.put('/api/v1/categories/:id', putCategories);
router.delete('/api/v1/categories/:id', deleteCategories);

// FUNCTIONS
/*
http :3000/api/v1/categories
*/
function getCategories(request,response,next) {
  // expects an array of object to be returned from the model
  console.log('hi');
  categories.get()
    .then( data => {
      console.log('hi2');
      console.log({data});
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}


/*
http :3000/api/v1/categories/0798d2c7-b209-45f6-a4d2-c13ccd1e9e8b
*/
function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  categories.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}


/*
echo '{"name":"Fletcher", "description":"person", "color":"cool"}' | http post :3000/api/v1/categories
*/
function postCategories(request,response,next) {
  // expects the record that was just added to the database
  categories.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


/*
echo '{"name":"Fletcher LaRue", "description":"person", "color":"Super cool"}' | http put :3000/api/v1/categories/0798d2c7-b209-45f6-a4d2-c13ccd1e9e8b 
*/
function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  categories.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


/*
http delete :3000/api/v1/categories/0798d2c7-b209-45f6-a4d2-c13ccd1e9e8b 
*/
function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  categories.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
