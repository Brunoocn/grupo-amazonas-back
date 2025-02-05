import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
// import { Address } from '../addresses/address.entity';
// import { Purchase } from '../purchases/purchase.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  //   @Field(() => [Address], { nullable: true })
  //   @OneToMany(() => Address, (address) => address.user)
  //   addresses: Address[];

  //   @Field(() => [Purchase], { nullable: true })
  //   @OneToMany(() => Purchase, (purchase) => purchase.user)
  //   purchases: Purchase[];
}
