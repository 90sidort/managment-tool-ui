const { Seeder } = require('mongo-seeding');
const path = require('path');
require('dotenv').config();

const config = {
  database: `mongodb://${process.env.USER_DB}:${process.env.USER_DB_PASS}@127.0.0.1:27017/${process.env.USER_DB_NAME}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
  dropDatabase: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve('./fixtures'));

const loadData = async function () {
  try {
    await seeder.import(collections);
  } catch (err) {
    console.log(err);
  }
};

loadData();
