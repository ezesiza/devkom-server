import { Module } from "@nestjs/common";
import { ProfileModule } from "./profile/profile.module";
import { EducationModule } from "./education/education.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { AuthModule } from "./auth/auth.module";
import { ExperienceModule } from "./experience/experience.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProfileModule,EducationModule,ExperienceModule, AuthModule],
})
export class AppModule {}
