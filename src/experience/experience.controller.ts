import {
    Post,
    Controller,
    Body,
    UseGuards,
    Logger, Get
  } from "@nestjs/common";
  import { Experience } from "src/experience/experience.entity";
  import { ExperienceService } from "src/experience/experience.service";
  import { User } from "src/auth/user.entity";
  import { GetUser } from "../auth/get-user.decorator";
  import { AuthGuard } from "@nestjs/passport";
import { CreateExperienceDto } from "./experience.dto";
  @UseGuards(AuthGuard())
  @Controller("experience")
  export class ExperienceController {
    private logger = new Logger("TasksController");
    constructor(private experienceService: ExperienceService) {}


    @Get("/all")
    getAllEducation(): Promise<Experience[]> {
      return this.experienceService.getAllExperience();
    }

    @Post("/create-exp")
    async createExperience(
      @GetUser() user: User,
      @Body() experienceDto:CreateExperienceDto,
    ): Promise<Experience> {
      return await this.experienceService.createExperience(user, experienceDto);
    }

  }