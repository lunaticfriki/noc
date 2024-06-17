import path from 'path';
import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDataSource } from './log.datasource';

describe('log.datasource test suite', () => {
  const newLog: LogEntity = new LogEntity({
    origin: path.basename(__dirname),
    message: 'test-message',
    level: LogSeverityLevel.low,
  });

  class MockLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return Promise.resolve(undefined);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return Promise.resolve([newLog]);
    }
  }

  it('should test abstract class', async () => {
    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(typeof mockLogDatasource.saveLog).toBe('function');
    expect(typeof mockLogDatasource.getLogs).toBe('function');

    await mockLogDatasource.saveLog(newLog);

    const logs: LogEntity[] = await mockLogDatasource.getLogs(
      LogSeverityLevel.low,
    );

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
