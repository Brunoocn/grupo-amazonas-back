import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Address {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  cep: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
