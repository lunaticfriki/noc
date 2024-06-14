import mongoose from 'mongoose';

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  public static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, { dbName });

      console.log('MONGO CONNECTION SUCCESS');
    } catch (error) {
      console.log('MONGO CONNECTION ERROR');
      throw error;
    }
  }
}
