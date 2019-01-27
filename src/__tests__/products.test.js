/**
 * Combines SuperTest and Mongoose Memory Server
 * to reduce (hopefully) the pain of
 * testing a Mongoose API
 */

const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').default;
const supertest = require('supertest');
const faker = require('faker');
const util = require('util');

let mongoServer;

let supergoose = module.exports = {};
/**
 * @server
 * @returns function that expects an express server
 */
supergoose.server = (server) => supertest(server);

/**
 * Typically used in Jest beforeAll hook
 */
supergoose.startDB = async () => {
  
  mongoServer = new MongoMemoryServer();
  
  const mongoUri = await mongoServer.getConnectionString();
  
  const mongooseOptions = {
    useNewUrlParser:true,
    useCreateIndex: true
  };
  
  await mongoose.connect(mongoUri, mongooseOptions, (err) => {
    if (err) console.error(err);
  });
};

/**
 * Typically used in Jest afterAll hook
 */
supergoose.stopDB = () => {
  mongoose.disconnect();
  mongoServer.stop();
};

const Products = require('../models/products.js');
let myProducts = new Products();


beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('products', () => {
  describe('routes', () => {
    it('can post an object', () => {
      let obj = {name:'Window', type:'Glass', size:'regular'};

      return myProducts.post(obj)
        .then( res => {
          expect(res).toMatchObject(obj);
        })
        .catch( e => {
          console.error(e);
        })
    });
  
    it('returns a single record on get with ID', () => {
      let expectedId;
      return myProducts.get()
        .then( res => {
          expectedId = res[0]._id
          let query = expectedId;
          return myProducts.get(query)
            .then( res => {
              return expect(res[0]._id).toEqual(expectedId);
            });
        })
        .catch( e => {
          console.error(e);
        });
    });

    it('changes a record correctly', (done) => {
      let objNew = {name:'Window', type:'Glass', size:'small'};
      let expectedId;
      return myProducts.get()
        .then( res => {
          expectedId = res[0]._id
          let query = expectedId;
          return myProducts.put(query, objNew)
            .then( res => {
              expect(res._id).toEqual(expectedId);
              expect(res).toMatchObject(objNew);
              done();
            });
        })
        .catch( e => {
          console.error(e);
        });
    });

    it('deletes a record correctly', () => {
      let expectedId;
      let returnedObj;
      return myProducts.get()
        .then( res => {
          expectedId = res[0]._id
          returnedObj = res[0];
          let query = expectedId;
          return myProducts.delete(query)
            .then( res => {
              expect(returnedObj._id).toEqual(res._id);
              return myProducts.get(expectedId)
                .then(res => {
                  expect(res).toEqual([]);
                })
            });
        })
        .catch( e => {
          console.error(e);
        });
    });
  });


});

// Just so that it can live in the tests folder
describe('supergoose', () => {
  it('is super', () => {
    expect(true).toBeTruthy();
  });
});