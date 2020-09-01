import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from 'src/profile/profile.repository';
import { User } from 'src/auth/user.entity';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async getAllProfiles(): Promise<Profile[]> {
    return this.profileRepository.getAllProfiles();
  }
  async getProfiles() {
    const users = await this.profileRepository.find({});
    if (users) {
      return users;
    } else {
      return [0];
    }
  }

  async getProfileById(id: number) {
    const foundProfile = await this.profileRepository.findOne(id);
    if (!foundProfile) {
      throw new NotFoundException(`User not found`);
    } else {
      return foundProfile;
    }
  }
  async getProfileByHandle(handle: string) {
    const foundProfile = await this.profileRepository.findOne(handle);
    if (!foundProfile) {
      throw new NotFoundException(`User not found`);
    } else {
      return foundProfile;
    }
  }

  // async getCurrentUser() {

  // }

  async createProfile(user: User, profileDto): Promise<Profile> {
    return this.profileRepository.createProfile(user, profileDto);
  }

  async editProfile(user, profileDto) {
    return await this.profileRepository.editProfile(user, profileDto);
  }

  async deleteProfile(user: User): Promise<void> {
    const result = await this.profileRepository.delete({ id: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${user.id}" not found`);
    }
  }
}
