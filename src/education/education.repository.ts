import { Repository, EntityRepository, getManager } from "typeorm";
import { Education } from "./education.entity";
import { User } from "src/auth/user.entity";
import {
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  ForbiddenException,
} from "@nestjs/common/exceptions";
import { CreateEducationDto } from "./education.dto";
import { UserRepository } from "src/auth/user.repository";

@EntityRepository(Education)
export class EducationRepository extends Repository<Education> {
  async getAllEducations() {
    const query = this.createQueryBuilder("education")
      .innerJoinAndSelect("education.user", "user")
      .getMany();
    return query;
  }

  async createEducation(user: User, educationDto:CreateEducationDto): Promise<any> {
    const {
      current,
      degree,
      fieldofstudy,
      from,
      to,
      school,
      description,
    } = educationDto;

    const newEducation:Education = new Education();
    newEducation.current = current;
    newEducation.degree = degree;
    newEducation.user = user["user"];
    newEducation.fieldofstudy = fieldofstudy;
    newEducation.from = from;
    newEducation.school = school;
    newEducation.to = to;
    newEducation.description = description;

    let savedEducation:Education;

    try {
      savedEducation = await newEducation.save();
    } catch (e) {
      console.log(e);
      throw new ForbiddenException("Error creating Education");
    }
    console.log("savedEducation", savedEducation);
    return savedEducation;
  }

}
