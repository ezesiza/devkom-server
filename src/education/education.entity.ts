import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  school: string;

  @Column()
  degree: string;

  @Column()
  fieldofstudy: string;

  @Column()
  from: string;

  @Column({nullable:true})
  to: string;

  @Column({nullable:true})
  current: boolean;

  @Column("simple-array", { nullable: true })
  description: string[];

  @Column({ nullable: true })
  userId: number;
}
