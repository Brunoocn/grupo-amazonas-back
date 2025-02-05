import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../resolvers/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    // return this.usersRepository.find({ relations: ['addresses', 'purchases'] });
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      //   relations: ['addresses', 'purchases'],
    });
  }

  create(createUserInput: CreateUserDTO): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }

  delete(id: number): boolean {
    return !!this.usersRepository.delete(id);
  }
}
