'use strict';

const uuid = require('uuid/v4');
const util = require('util');
const sanitizer = require('./sanitize');

class Categories {

  constructor() {
    this.database = [];
  }

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
  
  post(record) {
    record = sanitizer(record);
    record._id = uuid();
    this.database.push(record);
    return Promise.resolve(record);
  }

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
