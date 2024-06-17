import mongoose from 'mongoose';
import path from 'path';
import { envs } from '../../../config/plugins/envs.plugin';
import { LogSeverityLevel } from '../../../domain/entities/log.entity';
import { MongoDatabase } from '../init';
import { LogModel } from './log.model';

describe('log.model test suite', () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should create log model', async () => {
    const logData = {
      origin: path.basename(__dirname),
      message: 'test-message',
      level: LogSeverityLevel.low,
    };

    const log = await LogModel.create(logData);

    expect(log).toMatchObject(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      }),
    );
  });

  it('should return the schema object', () => {
    const schema = LogModel.schema.obj;

    expect(schema).toMatchObject(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        level: {
          type: expect.any(Function),
          enum: ['low', 'medium', 'high'],
          default: 'low',
        },
        origin: { type: expect.any(Function) },
        createdAt: expect.any(Object),
      }),
    );
  });
});
