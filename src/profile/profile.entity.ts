import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Unique,
  RelationId,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
@Unique(["handle"])
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    type => User,
    user => user.profile,
    { eager: false },
  )
  @JoinColumn()
  user: User;

  @Column()
  handle: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  status: string;

  @Column("simple-array", { nullable: true })
  skills: string[];

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  githubusername: string;

  @Column("simple-array", { nullable: true })
  social: string[];

  @Column({ nullable: true })
  userId: number;
}

// @Entity('profile')
// export class Experience {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @OneToOne(() => User, user => user.id)
//     @JoinColumn()
//     user: User;

//     @Column({ nullable: true })
//     title: string;

//     @Column({ nullable: true })
//     company: string;

//     @Column({ nullable: true })
//     location: string;

//     @Column({ nullable: true })
//     from: string;

//     @Column({ nullable: true })
//     to: string;

//     @Column({ nullable: true })
//     current: string;

//     @Column({ nullable: true })
//     description: string;
// }

// @Entity()
// export class Education extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @OneToOne(() => User)
//     @JoinColumn()
//     user: User;

//     @Column()
//     school: string;

//     @Column()
//     degree: string;

//     @Column()
//     fieldofstudy: string;

//     @Column()
//     from: string;

//     @Column()
//     to: string;

//     @Column()
//     current: string;

//     @Column()
//     description: string;
// }

// @Entity()
// export class Social extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @OneToOne(() => User, user => user.id)
//     @JoinColumn()
//     user: User;

//     @Column()
//     youtube: string;

//     @Column()
//     twitter: string;

//     @Column()
//     facebook: string;

//     @Column()
//     linkedin: string;

//     @Column()
//     instagram: string;

// }
