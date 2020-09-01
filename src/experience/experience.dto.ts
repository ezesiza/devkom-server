
export class CreateExperienceDto {
    id?:string;
    company: string;

    title: string;

    location: string;

    from: string;

    to: string;

    current: boolean;

    description: string[];
  }
