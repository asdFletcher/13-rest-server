![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Lab 13 Rest Server

### Author: Fletcher LaRue

### Links and Resources
[![Build Status](https://www.travis-ci.com/asdFletcher/13-rest-server.svg?branch=master)](https://www.travis-ci.com/asdFletcher/13-rest-server)

* [repo](https://github.com/asdFletcher/13-rest-server)
* [travis](https://www.travis-ci.com/asdFletcher/13-rest-server)
* [back-end](https://fl-13-rest-server.herokuapp.com/) (when applicable)

#### Documentation
* [jsdoc](https://fl-13-rest-server.herokuapp.com/docs) (All assignments)

### APIs
#### `categories.js`
##### Exported Values and Methods
 - router

#### `products.js`
##### Exported Values and Methods
 - router


### Modules
#### `categoriesHandlers.js`
##### Exported Values and Methods
  - getCategories(request,response,next)
  - getCategory(request,response,next)
  - postCategories(request,response,next)
  - putCategories(request,response,next)
  - deleteCategories(request,response,next)
 
#### `productsHandlers.js`
##### Exported Values and Methods
   - getProducts(request,response,next)
   - getProduct(request,response,next)
   - postProducts(request,response,next)
   - putProducts(request,response,next)
   - deleteProducts(request,response,next)

### Models
#### `categories.js`
##### Exported Classes
 - Product
  - Product class

#### `products.js`
##### Exported Classes
 - Categories
  - Categories class


### Schemas
#### `schema.js`
##### Exported Schemas
 - products
  - Mongoose model

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

Example `.env` file:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/products
```

#### Running the app locally
Clone the repo from github.
Install required dependencies:
```
 npm i
```

You'll also need to make sure that you are running Mongo. You don't need to create any databases or collections (they are created automatically).
```
 mongod --dbpath <path to your database here>
```

Start the app
```
 npm start
```

Send requests to the API.

The below examples use httpie to send HTTP requests using terminal commands.

Example GET requests
```
http :3000/api/v1/products
http :3000/api/v1/products/5c4df868772640444289196e
```

Example POST requests
```
echo '{"name":"Window", "type":"Glass", "size":"regular"}' | http post :3000/api/v1/products
echo '{"name":"Window", "type":"Glass", "size":"small"}' | http post :3000/api/v1/products
```

Example PUT requests
```
echo '{"name":"Door", "type":"Wood", "size":"regular"}' | http put :3000/api/v1/products/5c4cfe6cbc0e882cc7891a47
echo '{"name":"Door", "type":"Granite", "size":"regular"}' | http put :3000/api/v1/products/5c4cfe6cbc0e882cc7891a47
```

Example DELETE requests
```
http delete :3000/api/v1/products/5c4df87f772640444289196f
```

#### Running the app remotely
The app is hosted remotely on Heorku.
  
### Testing
Tests can be found in the `__tests__` directory:
`__tests__/<file to be tested>.test.js`

Where `<file to be tested>` is the name of the file that the test file applies to.

All testing for this class was done with Jest: 
* [Jest docs](https://jestjs.io/docs/en/getting-started)

Instructions for replicating the tests for this project are as follows:

* Clone the repo.
* Create a node runtime environment

    ```JavaScript
    npm init
    ```
    This will create a `package.json` file, a `package-lock.json` file.

* Install Jest

    ```JavaScript
    npm i jest
    ```

* Run jest

    ```JavaScript
    npm jest --verbose --coverage
    ```
    It is useful to bind this to the command:
    ```JavaScript
    npm test
    ```
    To do this, manually edit your package.json to include the following under the "scripts" attribute:
    ```Javascript
    "scripts": {
        "test": "jest --verbose --coverage",
        "test-watch": "jest --watchAll --verbose --coverage"
    }
    ```
    `test-watch` will re-run tests when the file is saved

---

