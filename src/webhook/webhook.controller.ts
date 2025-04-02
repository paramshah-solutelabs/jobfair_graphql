import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { retry } from 'rxjs';

@Controller('webhook')
export class WebhookController {
  constructor(
    private webHookService:WebhookService
  ){}

  @Post('job-application')
  handleJobApplication(@Body() payload: any) {
    console.log('Received webhook event:', payload);
    console.log(payload.event.data.new);
    const email = payload.event.data.new.email;
    return  this.webHookService.createApplication(payload.event.data.new);
  }
}
