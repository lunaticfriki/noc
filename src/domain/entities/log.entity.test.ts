import path from 'path';
import { LogEntity, LogSeverityLevel } from './log.entity';

describe('log.entity test suite', () => {
  const dataObj = {
    message: 'test-message',
    level: LogSeverityLevel.high,
    origin: path.basename(__dirname),
  };

  it('should create a LogEntity instance', () => {
    const log: LogEntity = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it('should create a LogEntity instance from JSON', () => {
    const json = `{"message":"SERVICE http://google.com WORKING","level":"low","createdAt":"2024-06-12T12:52:05.228Z","origin":"check-service.ts"}`;
    const log = LogEntity.fromJSON(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('SERVICE http://google.com WORKING');
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe('check-service.ts');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it('should create a LogEntity instance from Object', () => {
    const log: LogEntity = LogEntity.fromObject(dataObj);

    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
