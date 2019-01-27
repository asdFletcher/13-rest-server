'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const products = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  size: {type: String, required: true},
});

module.exports = mongoose.model('products', products);

