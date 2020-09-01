import { Repository, EntityRepository, getManager } from "typeorm";
import { Profile } from "./profile.entity";
import { User } from "src/auth/user.entity";
import {
  ConflictException,
  ForbiddenException,
} from "@nestjs/common/exceptions";
import { CreateProfileDto } from "./profile.dto";
import { UserRepository } from "src/auth/user.repository";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async getAllProfiles() {
    const query = this.createQueryBuilder("profile")
      .innerJoinAndSelect("profile.user", "user")
      .getMany();
    return query;
  }

  async createProfile(user: User, profileDto:CreateProfileDto): Promise<any> {

    const {
      skills,
      handle,
      company,
      location,
      social,
      bio,
      githubusername,
      status,
      website,
    } = profileDto;

    console.log(profileDto)
    const newProfile:Profile = new Profile();
    newProfile.skills = skills;
    newProfile.handle = handle;
    newProfile.user = user["user"];
    newProfile.company = company;
    newProfile.location = location;
    newProfile.social = social;
    newProfile.bio = bio;
    newProfile.githubusername = githubusername;
    newProfile.status = status;
    newProfile.website = website;


    const existingProfile = await this.findOne({ handle: handle });
    if (existingProfile) {
      throw new ConflictException(`handle already exists`);
    }

    console.log("profileDto", existingProfile);

    let savedProfile;

    try {
      savedProfile = await newProfile.save();
    } catch (e) {
      console.log(e);
      throw new ForbiddenException("Error creating Profile");
    }
    console.log("savedProfile", savedProfile);
    return savedProfile;
  }

  async editProfile(user: User, profileDto) {
    const someProfile = await this.findOne({ handle: profileDto.handle });
    console.log(someProfile, user);
    someProfile.skills = profileDto.skills.split(" ");
    someProfile.handle = profileDto.handle;
    someProfile.user = user;
    someProfile.company = profileDto.company;
    someProfile.location = profileDto.location;
    someProfile.social = profileDto.social;
    someProfile.bio = profileDto.bio;
    someProfile.githubusername = profileDto.githubusername;
    someProfile.status = profileDto.status;
    someProfile.website = profileDto.website;
    let updated;
    if (user.id === someProfile.user.id) {
      console.log(user.id, someProfile.user.id);
      try {
        updated = this.save(someProfile);
      } catch (e) {
        throw new ForbiddenException("Unauthorized!");
      }
    } else {
      return updated;
    }
  }
}

//    const existingProfile = await this.findOne({ where: { handle, userId: user.id }  });