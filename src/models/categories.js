'use strict';

const uuid = require('uuid/v4');
const util = require('util');

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
    record._id = uuid();
    this.database.push(record);
  }

  put(_id, record) {
    
  }

  delete(_id) {

  }

}

module.exports = Categories;
