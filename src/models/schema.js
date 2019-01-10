'use strict';

const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  size: {type: String, required: true},
});

module.exports = mongoose.model('productsSchema', productsSchema);
