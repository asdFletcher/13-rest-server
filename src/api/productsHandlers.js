'use strict';

/**
 * @module productsHandlers
 */

/**
 * @function getProducts
 * Gets all records
 * @param req {object} Express Request Object
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function getProducts(request,response,next) {
  // expects an array of objects back
  products.get()
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
 * @function getProduct
 * Gets one record
 * Required params: req.params.id
 * @param req {object} Express Request Object 
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function getProduct(request,response,next) {
  // expects an array with one object in it
  products.get(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * @function postProducts
 * Adds one record
 * Required params: req.body
 * @param req {object} Express Request Object 
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function postProducts(request,response,next) {
  products.post(request.body)
  .then( result => response.status(200).json(result) )
  .catch( next );
}

/**
 * @function putProducts
 * Updates one record
 * Required params: req.body, req.params.id
 * @param req {object} Express Request Object 
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function putProducts(request,response,next) {
  // expects the record that was just updated in the database
  products.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * @function deleteProducts
 * Deletes one record
 * Required params: req.params.id
 * @param req {object} Express Request Object 
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
function deleteProducts(request,response,next) {
  // Expects no return value (the resource should be gone)
  products.delete(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

module.exports = {
  getProducts,
  getProduct,
  postProducts,
  putProducts,
  deleteProducts,
}