import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';

import { Repository } from 'typeorm';
import { LoginInput } from '../domain/inputs/login.input';
import { RegisterInput } from '../domain/inputs/register.input';
import { User } from '../infra/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserInput: LoginInput) {
    console.log(loginUserInput.email);
    const user = await this.usersRepository.findOne({
      where: { email: loginUserInput.email },
    });

    if (!user) {
      throw new NotFoundException('Email e/ou senha inválidos');
    }

    const isPasswordValid = await compare(
      loginUserInput.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email e/ou senha inválidos');
    }

    return user;
  }

  async login(loginUserInput: LoginInput) {
    const user = await this.validateUser(loginUserInput);

    const payload = { id: user.id, name: user.name, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'default_secret',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    return {
      token,
      user: payload,
    };
  }

  async register(registerUserInput: RegisterInput) {
    const userExists = await this.usersRepository.findOne({
      where: { email: registerUserInput.email },
    });

    if (userExists) {
      throw new BadRequestException(
        `User with email ${registerUserInput.email} already exists`,
      );
    }

    const newUser = this.usersRepository.create(registerUserInput);
    return this.usersRepository.save(newUser);
  }
}
