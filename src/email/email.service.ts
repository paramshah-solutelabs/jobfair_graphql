import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { DataSource } from 'typeorm';
import { ServerClient } from 'postmark';
import { EmployeeType } from 'src/employees/enums/employee-type.enum';

@Injectable()
export class EmailService {
  private client: ServerClient;

  constructor(
    private readonly mailService: MailerService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    const postmarkToken = this.configService.get<string>(
      'POSTMARK_SERVER_TOKEN',
    );

    if (!postmarkToken) {
      throw new Error(
        'Missing Postmark API token. Set POSTMARK_SERVER_TOKEN in .env',
      );
    }

    this.client = new ServerClient(postmarkToken);
  }

  async forgotPassword(name: string, email: string, token: string) {
    let templateId = 39079914;
    const templateData = {
      name,
      token,
    };
    try {
      await this.client.sendEmailWithTemplate({
        From: 'param.s1@solutelabs.com',
        To: email,
        TemplateId: templateId,
        TemplateModel: templateData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendDynamicEmail(
    type: 'candidate' | 'employee',
    name: string,
    email: string,
    token: string,
    role?: EmployeeType,
  ) {
    let subject = '';
    let templateId: number;
    let templateModel: any = {
      name,
      email,
      token,
      action_url: 'https://jobfair2.com/set-up-account',
    };

    if (type === 'candidate') {
      subject = 'JobFair2 - Application Received & Next Steps';
      templateId = 39079447;
    } else if (type === 'employee') {
      subject = 'JobFair2 - Invitation to Register';
      templateId = 39114310;
      templateModel.role = role;
    } else {
      throw new Error('Invalid email type');
    }

    try {
      await this.client.sendEmailWithTemplate({
        From: 'param.s1@solutelabs.com',
        To: email,
        TemplateId: templateId,
        TemplateModel: templateModel,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
