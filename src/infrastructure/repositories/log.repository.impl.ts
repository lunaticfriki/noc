import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDataSource) {}

  saveLog(log: LogEntity): Promise<void> {
    throw new Error('METHOD NOT IMPLEMENTED');
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('METHOD NOT IMPLEMENTED');
  }
}
