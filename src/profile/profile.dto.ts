import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  handle: string;

  company: string;

  @IsNotEmpty()
  website: string;

  location: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  skills: string[];

  experience: string[];
  education: string[];
  social: string[];

  bio: string;

  githubusername: string;
}
