'use strict';

const Categories = require('../models/categories.js');
const categories = new Categories();

/**
 * @module categoriesHandlers
 */

/**
 * @function getCategories
 * Gets all records
 * @param req {object} Express Request Object
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function getCategories(request,response,next) {
  // expects an array of object to be returned from the model
  categories.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

/**
 * @function getCategory
 * Gets one record
 * Required params: req.params.id
 * @param req {object} Express Request Object 
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  categories.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

/**
 * @function postCategories
 * Adds one record
 * Required params: req.body
 * @param req {object} Express Request Object 
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function postCategories(request,response,next) {
  // expects the record that was just added to the database
  categories.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * @function putCategories
 * Updates one record
 * Required params: req.body, req.params.id
 * @param req {object} Express Request Object 
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  categories.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * @function deleteCategories
 * Deletes one record
 * Required params: req.params.id
 * @param req {object} Express Request Object 
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  categories.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = {
  getCategories,
  getCategory,
  postCategories,
  putCategories,
  deleteCategories,
}