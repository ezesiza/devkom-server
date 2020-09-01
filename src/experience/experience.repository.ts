import { Repository, EntityRepository, getManager } from "typeorm";
import { Experience } from "./experience.entity";
import { User } from "src/auth/user.entity";
import {
  ForbiddenException,
} from "@nestjs/common/exceptions";
import { CreateExperienceDto } from "./experience.dto";

@EntityRepository(Experience)
export class ExperienceRepository extends Repository<Experience> {
  async getAllExperiences() {
    const query = this.createQueryBuilder("experience")
      .innerJoinAndSelect("experience.user", "user")
      .getMany();
    return query;
  }

  async createExperience(user: User, experienceDto:CreateExperienceDto): Promise<any> {
    const {
      current,
      title,
      location,
      from,
      to,
      company,
      description,
    } = experienceDto;

    const newExperience:Experience = new Experience();
    newExperience.current = current;
    newExperience.title = title;
    newExperience.user = user["user"];
    newExperience.location = location;
    newExperience.from = from;
    newExperience.company = company;
    newExperience.to = to;
    newExperience.description = description;

    let savedExperience:Experience;

    try {
      savedExperience = await newExperience.save();
    } catch (e) {
      console.log(e);
      throw new ForbiddenException("Error creating Experience");
    }
    console.log("savedExperience", savedExperience);
    return savedExperience;
  }

}
