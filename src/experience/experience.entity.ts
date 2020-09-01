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


@Entity("experience")
export class Experience extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user: User;

    @Column()
    title: string;

    @Column()
    company: string;

    @Column()
    location: string;

    @Column()
    from: string;

    @Column({ nullable: true })
    to: string;

    @Column({ nullable: true })
    current: boolean;

    @Column( "simple-array",{ nullable: true })
    description: string[];
}