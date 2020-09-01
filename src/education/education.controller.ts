import {
    Post,
    Controller,
    Body,
    Req,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
    Logger,
    Query,
  } from "@nestjs/common";
  import { Education } from "src/education/education.entity";
  import { EducationService } from "src/education/education.service";
  import { User } from "src/auth/user.entity";
  import { GetUser } from "../auth/get-user.decorator";
  import { AuthGuard } from "@nestjs/passport";
  import { HttpExceptionFilter } from "./../profile/http.exception";
import { CreateEducationDto } from "./education.dto";
  @UseGuards(AuthGuard())
  @Controller("education")
  export class EducationController {
    private logger = new Logger("TasksController");
    constructor(private educationService: EducationService) {}


    @Get("/all")
    getAllEducation(): Promise<Education[]> {
      return this.educationService.getAllEducation();
    }

    @Post("/create")
    async createEducation(
      @GetUser() user: User,
      @Body() educationDto:CreateEducationDto,
    ): Promise<Education> {
      return await this.educationService.createEducation(user, educationDto);
    }

  }