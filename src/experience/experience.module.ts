import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { ExperienceService } from "src/experience/experience.service";
import { ExperienceController } from "src/experience/experience.controller";
import { ExperienceRepository } from "src/experience/experience.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceRepository]), AuthModule],

  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}