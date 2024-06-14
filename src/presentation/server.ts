import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service.multiple';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

export class Server {
  public static async start() {
    console.log('SERVER STARTED!');

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'http://google.com';

    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`${url} IS OK!`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
