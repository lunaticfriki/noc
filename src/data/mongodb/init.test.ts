import mongoose from 'mongoose';
import { afterEach } from 'node:test';
import { MongoDatabase } from './init';

describe('init mongoDB test suite', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  it('should connect to mongoDB', async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBe(true);
  });

  it('should throw an error', async () => {
    try {
      await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'mongodb://lunaticfriki:123456789@patata:27017/',
      });
      expect(true).toBe(false);
    } catch (error) {
      expect(true).toBe(true);
    }
  });
});
