import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log('SERVER STARTED!');

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'http://localhost:3000';

    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} IS OK!`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });

    // const emailService = new EmailService();
    // emailService.sendEmail({
    //   to: 'ovenor11@proton.me',
    //   subject: 'System logs',
    //   htmlBody: `
    //     <h3>System logs</h3>
    //     <p>These are the logs</p>
    //     <p>See logs attached</p>
    //   `,
    // });
  }
}
