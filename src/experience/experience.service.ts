import { Injectable } from "@nestjs/common";
  import { InjectRepository } from "@nestjs/typeorm";
  import { ExperienceRepository } from "src/experience/experience.repository";
  import { User } from "src/auth/user.entity";
  import { Experience } from "./experience.entity";
import { CreateExperienceDto } from "./experience.dto";
  @Injectable()
  export class ExperienceService {
    constructor(
      @InjectRepository(ExperienceRepository)
      private experienceRepository: ExperienceRepository,
    ) {}

    async getAllExperience(): Promise<any> {
      return this.experienceRepository.getAllExperiences();
    }


    async createExperience(user: User, experienceDto:CreateExperienceDto): Promise<Experience> {
        return this.experienceRepository.createExperience(user, experienceDto);
      }

  }