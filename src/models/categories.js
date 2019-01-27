'use strict';

const uuid = require('uuid/v4');
const util = require('util');
const sanitizer = require('./sanitize');

  /**
   * A model for managing categories.
   */

class Categories {


  constructor() {
    this.database = [];
  }


  /**
   * Get one or get many
   * @param {string} _id
   * @returns Resolved promise with data
   * @memberof Categories
   */
  get(_id) {
    if (_id){
      let result = [];
      for(let i = 0; i < this.database.length; i++){
        if (this.database[i]._id === _id.toString()){
          result.push(this.database[i])
        }
      }
      return Promise.resolve(result);
    }
    return Promise.resolve(this.database);
  }

  /**
   * Post one record
   * @param {object} record
   * @returns Resolved promise with the record
   * @memberof Categories
   */
  post(record) {
    record = sanitizer(record);
    record._id = uuid();
    this.database.push(record);
    return Promise.resolve(record);
  }

  /**
   * Update one record
   * @param {string} _id
   * @param {object} record
   * @returns Resolved promise with the record, or empty object if nonexistent
   * @memberof Categories
   */
  put(_id, record) {
    record = sanitizer(record);
    for(let i = 0; i < this.database.length; i++){
      if (this.database[i]._id === _id.toString()){
        
        // database match
        for(let key in record){
          this.database[i][key] = record[key];
        }
        return Promise.resolve(this.database[i]);
      }
    }
    return Promise.resolve({});
  }

  /**
   * Delete one record
   * @param {string} _id
   * @param {object} record
   * @returns Empty object
   * @memberof Categories
   */
  delete(_id) {
    for(let i = 0; i < this.database.length; i++){
      if (this.database[i]._id === _id.toString()){
        this.database.splice(i,1);
        return Promise.resolve({});
      }
    }
  }

}

module.exports = Categories;
