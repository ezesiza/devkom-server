import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { ProfileService } from "src/profile/profile.service";
import { ProfileController } from "src/profile/profile.controller";
import { ProfileRepository } from "src/profile/profile.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository]), AuthModule],

  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
