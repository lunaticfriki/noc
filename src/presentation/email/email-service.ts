import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendEmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  //TODO: attachements
}

//TODO: Attachement

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER.SERVICE,
    auth: {
      user: envs.MAILER.MAIL,
      pass: envs.MAILER.SECRET_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      });
      console.log(sentInformation);
      return true;
    } catch (error) {
      return false;
    }
  }
}
