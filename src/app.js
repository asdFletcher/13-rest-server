'use strict';
/**
 * API Server Module
 * @module src/app
 */
// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );
const categories = require( './api/categories.js' );
const products = require( './api/products.js' );

// Prepare the express app
const app = express();

// App Level middleware
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(categories);
app.use(products);

app.use('/docs', express.static('docs'));

// Catchalls
app.use(notFound);
app.use(errorHandler);

let isRunning = false;

/**
 * Start Server on specified port
 * @param port {integer}
 */
module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};
