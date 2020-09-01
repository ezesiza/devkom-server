import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { EducationService } from "src/education/education.service";
import { EducationController } from "src/education/education.controller";
import { EducationRepository } from "src/education/education.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([EducationRepository]), AuthModule],

  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}