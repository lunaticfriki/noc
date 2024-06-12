import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource()
  new MongoLogDatasource()
);
// const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('SERVER STARTED!');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'http://google.com';

      new CheckService(
        logRepository,
        () => console.log(`${url} IS OK!`),
        (error) => console.log(error)
      ).execute(url);
    });

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   'ovenor11@proton.me'
    // );
  }
}
