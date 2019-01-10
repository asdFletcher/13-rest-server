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

const Categories = require('../models/categories');

function fakeCategory(){
  let result = {};
  result.name = faker.hacker.noun();
  result.description = faker.hacker.phrase();
  result.color = faker.commerce.color();
  return result;
}

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('categories', () => {
  describe('GET routes', () => {
    it('returns an empty array when the db is empty', () => {
      let myCategories = new Categories();
      const expected = [];
      return myCategories.get()
        .then( (result) => {
          // console.log({result});
          expect(result).toEqual(expected);
        });
    });
  
    it('returns all records on GET without id', () => {
      let myCategories = new Categories();
      let fake1 = fakeCategory();
      let fake2 = fakeCategory();
      let fake3 = fakeCategory();
      const expected = [{...fake1}, {...fake2}, {...fake3}];
      const postPromises = [
        myCategories.post(fake1),
        myCategories.post(fake2),
        myCategories.post(fake3)
      ];

      return Promise.all(postPromises)
        .then(() => {
          return myCategories.get()
            .then( (result) => {
              // console.log({expected});
              expect(result[0].name).toEqual(expected[0].name);
              expect(result[0].description).toEqual(expected[0].description);
              expect(result[0].color).toEqual(expected[0].color);

              expect(result[1].name).toEqual(expected[1].name);
              expect(result[1].description).toEqual(expected[1].description);
              expect(result[1].color).toEqual(expected[1].color);

              expect(result[2].name).toEqual(expected[2].name);
              expect(result[2].description).toEqual(expected[2].description);
              expect(result[2].color).toEqual(expected[2].color);
            })
            .catch();
        })
        .catch();
    });

    it('returns a single record on GET with an id', () => {
      let myCategories = new Categories();
      let fake1 = fakeCategory();
      let expectedId;
      return myCategories.post(fake1)
        .then((result) => {
          expectedId = result._id
          return myCategories.get(expectedId)
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
      let myCategories = new Categories();
      let result = myCategories.get()
        .then((result) => {
          expect(result).toEqual([]);
        })
        .catch();
    });
  
    it('returns a single record on GET with an id', () => {
      let myCategories = new Categories();

      let id = 1;

      let result = myCategories.get()
        .then((result) => {
          expect(result).toEqual([]);
        })
        .catch();
    });
  });

  describe('PUT routes', () => {
    it('changes a record correctly', () => {
      let myCategories = new Categories();
      let fake1 = fakeCategory();
      let fake2 = fakeCategory();
      let fake1Id;

      return myCategories.post(fake1)
        .then((result) => {
          fake1Id = result._id;
          return myCategories.put(fake1Id, fake2)
            .then( (result) => {
              expect(result.name).toEqual(fake2.name);
              expect(result.description).toEqual(fake2.description);
              expect(result.color).toEqual(fake2.color);
            })
            .catch();
        })
        .catch();
    });
  
    it('returns an empty record when id does not exist', () => {
      let myCategories = new Categories();
      let fake1 = fakeCategory();
      let fake2 = fakeCategory();
      let fake1Id = 35;

      return myCategories.post(fake1)
        .then((result) => {
          return myCategories.put(fake1Id, fake2)
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
      let myCategories = new Categories();
      let fake1 = fakeCategory();
      let fake1Id;

      return myCategories.post(fake1)
        .then((result) => {
          fake1Id = result._id;
          return myCategories.delete(fake1Id)
            .then( (result) => {
              expect(result).toEqual({});
              return myCategories.get()
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