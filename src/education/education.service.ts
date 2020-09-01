import {
    Injectable,
    NotFoundException,
    ConflictException,
  } from "@nestjs/common";
  import { InjectRepository } from "@nestjs/typeorm";
  import { EducationRepository } from "src/education/education.repository";
  import { User } from "src/auth/user.entity";
  import { Education } from "./education.entity";
import { CreateEducationDto } from "./education.dto";
  @Injectable()
  export class EducationService {
    constructor(
      @InjectRepository(EducationRepository)
      private educationRepository: EducationRepository,
    ) {}

    async getAllEducation(): Promise<any> {
      return this.educationRepository.getAllEducations();
    }


    async createEducation(user: User, educationDto:CreateEducationDto): Promise<Education> {
        return this.educationRepository.createEducation(user, educationDto);
      }

  }