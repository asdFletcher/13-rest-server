'use strict';

const uuid = require('uuid/v4');

const schema = require('./schema.js');
// console.log(schema);
class Products {

  constructor() {
    this.database = [];
  }

  get(_id) {
    let queryObject = _id ? {_id:  _id} : {};
    return schema.find(queryObject);
  }
  
  post(entry) {
    let newRecord = new schema(entry);
    return newRecord.save();
  }

  put(id, entry) {

  }

  delete(id) {

  }

  sanitize(entry) {
    
  }

}

module.exports = Products;
