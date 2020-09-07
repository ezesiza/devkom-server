import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { IJwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { JwtStrategy } from "./jwt.strategy";

import * as config from "config";

const jwtConfig: any = config.get("jwt");

@Injectable()
export class AuthService {
  private logger = new Logger("AuthService");

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{
    accessToken: string;
    user: User;
    expiresIn: string;
    decoded: any;
  }> {
    const authData: any = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!authData) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: IJwtPayload = { email: authData.user.email };
    const accessToken: any = await this.jwtService.sign(payload);
    const decoded: any = await this.jwtService.decode(accessToken);
    return {
      accessToken,
      user: authData.user,
      expiresIn: jwtConfig.expiresIn,
      decoded,
    };
  }
}
