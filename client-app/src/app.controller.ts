import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit{
  private  usersService;
  constructor(private readonly appService: AppService,@Inject('USER_SERVICE') private client:ClientGrpc) {}
  onModuleInit() {
    this.usersService=this.client.getService('UserService')
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('users/:email')
  async getUsers(@Param('email') email: string) {  // Corrected @Param to extract 'email'
    console.log(typeof email);  // Check if 'email' is a string
    if (!this.usersService) {
      throw new Error('Users service is not initialized');
    }
    return this.usersService.getUser({ email });
  }
  
}
