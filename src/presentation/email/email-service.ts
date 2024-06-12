import path from 'path';
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

const okLog = new LogEntity({
  level: LogSeverityLevel.low,
  message: 'Email sent',
  origin: path.basename(__filename),
});

const errorLog = new LogEntity({
  level: LogSeverityLevel.high,
  message: 'Email was not sent',
  origin: path.basename(__filename),
});

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER.SERVICE,
    auth: {
      user: envs.MAILER.MAIL,
      pass: envs.MAILER.SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Server logs';
    const htmlBody = `
      <h3>System logs</h3>
      <p>These are the logs</p>
      <p>See logs attached</p>
    `;
    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
