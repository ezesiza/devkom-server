import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Unique,
  JoinColumn, OneToMany
} from "typeorm";
import { Profile } from "../profile/profile.entity";
import * as bcrypt from "bcryptjs";
import { Education } from "src/education/education.entity";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    type => Profile,
    profile => profile.user,
    // {eager:true}
  )
  @JoinColumn()
  profile: Profile;

  @OneToMany(type => Education,
    education=>education.user,
   {
     eager:true,
     cascade:true
   } )
  education: Education;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  date: Date;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash: string = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
