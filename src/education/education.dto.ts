
export class CreateEducationDto {
  id?:string;
  school: string;

  degree: string;

  fieldofstudy: string;

  from: string;

  to: string;

  current: boolean;

  description: string[];
}
