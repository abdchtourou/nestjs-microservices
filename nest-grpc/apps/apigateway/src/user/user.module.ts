import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_SERVICE } from './constant';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: APP_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: APP_PACKAGE_NAME,
          protoPath: join(__dirname, '../app.proto'),
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
