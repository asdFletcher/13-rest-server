'use strict';

const uuid = require('uuid/v4');
const util = require('util');
const schema = require('./schema.js');

  /**
   * A model for managing products.
   */
class Product {

  constructor(schema) {
  }

  /**
   * Get one or get many
   * @param {string} _id
   * @returns Resolved promise with data
   * @memberof Product
   */
  get(_id) {
    let queryObject = _id ? {_id:  _id} : {};
    return schema.find(queryObject);
  }
  
  /**
   * Post one record
   * @param {object} record
   * @returns Resolved promise with the record
   * @memberof Product
   */
  post(entry) {
    let newRecord = new schema(entry);
    return newRecord.save();
  }

  /**
   * Update one record
   * @param {string} _id
   * @param {object} record
   * @returns Resolved promise with the record, or empty object if nonexistent
   * @memberof Product
   */
  put(_id, entry) {
    const query = {_id:_id}
    const options = {new: true};
    return schema.findByIdAndUpdate( query, entry, options);
  }

  /**
   * Delete one record
   * @param {string} _id
   * @param {object} record
   * @returns Empty object
   * @memberof Product
   */
  delete(_id) {
    const query = {_id:_id}
    const options = {new: true};
    return schema.findByIdAndDelete(query);
  }

}

module.exports = Product;
