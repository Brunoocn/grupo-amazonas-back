import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
