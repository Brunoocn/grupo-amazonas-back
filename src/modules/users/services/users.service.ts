import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../graphql/inputs/create-user.input';
import { UpdateUserInput } from '../graphql/inputs/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['addresses', 'purchases'] });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['addresses', 'purchases'],
    });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserInput.email },
    });
    if (existingUser) {
      throw new BadRequestException(
        `User with email ${createUserInput.email} already exists`,
      );
    }

    const newUser = this.usersRepository.create(createUserInput);

    return this.usersRepository.save(newUser);
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: updateUserInput.id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${updateUserInput.id} not found`,
      );
    }

    if (updateUserInput.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserInput.email },
      });

      if (existingUser && existingUser.id !== updateUserInput.id) {
        throw new BadRequestException(
          `User with email ${updateUserInput.email} already exists`,
        );
      }
    }

    Object.assign(user, updateUserInput);
    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.usersRepository.delete(id);
    return { success: true, message: `User with ID ${id} has been deleted` };
  }
}
