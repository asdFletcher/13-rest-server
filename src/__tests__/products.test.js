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

function fakeProduct(){
  let result = {};
  result.name = faker.hacker.noun();
  result.type = faker.commerce.color();
  result.size = faker.hacker.noun();
  return result;
}

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('products', () => {
  describe('GET routes', () => {
    it('returns an empty array when the db is empty', () => {
      let myProducts = new Products();
      const expected = [];
      return myProducts.get()
        .then( (result) => {
          // console.log({result});
          expect(result).toEqual(expected);
        });
    });
  
    it('returns all records on GET without id', () => {
      let myProducts = new Products();
      let fake1 = fakeProduct();
      let fake2 = fakeProduct();
      let fake3 = fakeProduct();
      const expected = [{...fake1}, {...fake2}, {...fake3}];
      const postPromises = [
        myProducts.post(fake1),
        myProducts.post(fake2),
        myProducts.post(fake3)
      ];

      return Promise.all(postPromises)
        .then(() => {
          return myProducts.get()
            .then( (result) => {
              // console.log({expected});
              expect(result[0].name).toEqual(expected[0].name);
              expect(result[0].type).toEqual(expected[0].type);
              expect(result[0].size).toEqual(expected[0].size);

              expect(result[1].name).toEqual(expected[1].name);
              expect(result[1].type).toEqual(expected[1].type);
              expect(result[1].size).toEqual(expected[1].size);

              expect(result[2].name).toEqual(expected[2].name);
              expect(result[2].type).toEqual(expected[2].type);
              expect(result[2].size).toEqual(expected[2].size);
            })
            .catch();
        })
        .catch();
    });

    it('returns a single record on GET with an id', () => {
      let myProducts = new Products();
      let fake1 = fakeProduct();
      let expectedId;
      return myProducts.post(fake1)
        .then((result) => {
          expectedId = result._id
          return myProducts.get(expectedId)
            .then( (result) => {
              expect(result[0]._id.toString()).toEqual(expectedId);
            })
            .catch();
        })
        .catch();

    });
  });

  describe('POST routes', () => {
    it('returns an empty array when the db is empty', () => {
      let myProducts = new Products();
      let result = myProducts.get()
        .then((result) => {
          expect(result).toEqual([]);
        })
        .catch();
    });
  
    it('returns a single record on GET with an id', () => {
      let myProducts = new Products();

      let id = 1;

      let result = myProducts.get()
        .then((result) => {
          expect(result).toEqual([]);
        })
        .catch();
    });
  });

  describe('PUT routes', () => {
    it('changes a record correctly', () => {
      let myProducts = new Products();
      let fake1 = fakeProduct();
      let fake2 = fakeProduct();
      let fake1Id;

      return myProducts.post(fake1)
        .then((result) => {
          fake1Id = result._id;
          return myProducts.put(fake1Id, fake2)
            .then( (result) => {
              expect(result.name).toEqual(fake2.name);
              expect(result.type).toEqual(fake2.type);
              expect(result.size).toEqual(fake2.size);
            })
            .catch();
        })
        .catch();
    });
  
    it('returns an empty record when id does not exist', () => {
      let myProducts = new Products();
      let fake1 = fakeProduct();
      let fake2 = fakeProduct();
      let fake1Id = 35;

      return myProducts.post(fake1)
        .then((result) => {
          return myProducts.put(fake1Id, fake2)
            .then( (result) => {
              expect(result).toEqual({});
            })
            .catch();
        })
        .catch();
    });
  });

  describe('DELETE routes', () => {
    it('deletes a record correctly', () => {
      let myProducts = new Products();
      let fake1 = fakeProduct();
      let fake1Id;

      return myProducts.post(fake1)
        .then((result) => {
          fake1Id = result._id;
          return myProducts.delete(fake1Id)
            .then( (result) => {
              expect(result).toEqual({});
              return myProducts.get()
                .then( (result) => {
                  // console.log({result});
                  expect(result).toEqual([]);
                })
            })
            .catch();
        })
        .catch();
    });
  
  });
});

// Just so that it can live in the tests folder
describe('supergoose', () => {
  it('is super', () => {
    expect(true).toBeTruthy();
  });
});