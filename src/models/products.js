'use strict';

const uuid = require('uuid/v4');
const util = require('util');
const schema = require('./schema.js');

class Product {

  constructor(schema) {
  }

  get(_id) {
    let queryObject = _id ? {_id:  _id} : {};
    return schema.find(queryObject);
  }
  
  post(entry) {
    let newRecord = new schema(entry);
    return newRecord.save();
  }

  put(_id, entry) {
    const query = {_id:_id}
    const options = {new: true};
    return schema.findByIdAndUpdate( query, entry, options);
  }

  delete(_id) {
    const query = {_id:_id}
    const options = {new: true};
    return schema.findByIdAndDelete(query);
  }

}

module.exports = Product;
