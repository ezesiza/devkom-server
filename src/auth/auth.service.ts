import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { JwtStrategy } from './jwt.strategy';

import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; user: User; expiresIn: string; decoded }> {
    const authData = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    // console.log('authData', authData);

    if (!authData) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: authData.user.email };
    const accessToken = await this.jwtService.sign(payload);
    const decoded = await this.jwtService.decode(accessToken);
    // console.log('decoded', decoded);
    return {
      accessToken,
      user: authData.user,
      expiresIn: jwtConfig.expiresIn,
      decoded,
    };
  }
}
