import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from 'apps/auth/src/user/strategy/auth.strategy';

@Module({
  imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: 'SecretKey',
        signOptions: { expiresIn: '60m' },
      }),
    ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
})
export class UserModule {}
