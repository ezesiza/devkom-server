import {
  Post,
  Controller,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Logger,
} from "@nestjs/common";
import { Profile } from "src/profile/profile.entity";
import { ProfileService } from "src/profile/profile.service";
import { User } from "src/auth/user.entity";
import { GetUser } from "../auth/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard())
@Controller("profile")
export class ProfileController {
  private logger = new Logger("TasksController");
  constructor(private profileService: ProfileService) {}

  @Get("/all")
  getAllProfiles(): Promise<Profile[]> {
    return this.profileService.getAllProfiles();
  }

  @Get("/:id")
  async getProfileById(@Param("id", ParseIntPipe) id: number) {
    return await this.profileService.getProfileById(id);
  }

  @Post("/createprofile")
  async createProfile(
    @GetUser() user: User,
    @Body() profileDto,
  ): Promise<Profile> {
    // console.log(user);
    return await this.profileService.createProfile(user, profileDto);
  }
  @Post("/editprofile")
  async editProfile(
    @GetUser() user: User,
    @Body() profileDto: Profile,
  ): Promise<Profile> {
    const users = await this.profileService.editProfile(user, profileDto);
    return users;
  }

  @Get("/")
  async getProfiles() {
    const foundProfile = await this.profileService.getProfiles();

    return { foundProfile };
  }

  @Get("/handle/:handle")
  async getProfileByHandle(handle: string) {
    return this.profileService.getProfileByHandle(handle);
  }
}
