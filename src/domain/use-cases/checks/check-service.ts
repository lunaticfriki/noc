import path from 'path';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`ERROR ON CHECK SERVICE: ${url}`);
      }

      const log = new LogEntity({
        message: `SERVICE ${url} WORKING`,
        level: LogSeverityLevel.low,
        origin: path.basename(__filename),
      });
      await this.logRepository.saveLog(log);

      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMessage = `${url} I NOT OK. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: path.basename(__filename),
      });
      await this.logRepository.saveLog(log);

      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
