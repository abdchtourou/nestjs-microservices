import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @GrpcMethod('UserService', 'GetUser')
  getUser(data: { email: string }) {
    console.log(data)
    return data;
  }

}
