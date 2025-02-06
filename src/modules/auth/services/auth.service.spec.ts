import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';

import { RegisterInput } from '../graphql/inputs/register.input';
import { LoginInput } from '../graphql/inputs/login.input';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InMemoryUserRepository } from 'src/test/repositories/auth.repository';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: InMemoryUserRepository;
  let jwtService: JwtService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    jwtService = new JwtService({
      secret: 'test_secret',
    });

    authService = new AuthService(userRepository as any, jwtService);
  });

  afterEach(() => {
    userRepository.clear();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerInput: RegisterInput = {
        name: 'Test User',
        email: 'test@email.com',
        password: '123456',
      };

      const user = await authService.register(registerInput);

      expect(user).toHaveProperty('name');
      expect(user.email).toBe(registerInput.email);
    });

    it('should throw an error if the email already exists', async () => {
      const registerInput: RegisterInput = {
        name: 'Test User',
        email: 'test@email.com',
        password: '123456',
      };

      await authService.register(registerInput);

      await expect(authService.register(registerInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('validateUser', () => {
    it('should validate a user correctly', async () => {
      const registerInput: RegisterInput = {
        name: 'Test User',
        email: 'test@email.com',
        password: await bcrypt.hash('123456', 10),
      };

      await userRepository.save(registerInput as any);

      const loginInput: LoginInput = {
        email: 'test@email.com',
        password: '123456',
      };

      const user = await authService.validateUser(loginInput);

      expect(user).toHaveProperty('id');
      expect(user.email).toBe(loginInput.email);
    });

    it('should throw an error if the email does not exist', async () => {
      const loginInput: LoginInput = {
        email: 'notfound@email.com',
        password: '123456',
      };

      await expect(authService.validateUser(loginInput)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if the password is incorrect', async () => {
      const registerInput: RegisterInput = {
        name: 'Test User',
        email: 'test@email.com',
        password: await bcrypt.hash('123456', 10),
      };

      await userRepository.save(registerInput as any);

      const loginInput: LoginInput = {
        email: 'test@email.com',
        password: 'wrongpassword',
      };

      await expect(authService.validateUser(loginInput)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    it('should return a valid JWT token on login', async () => {
      const registerInput: RegisterInput = {
        name: 'Test User',
        email: 'test@email.com',
        password: await bcrypt.hash('123456', 10),
      };

      await userRepository.save(registerInput as any);

      const loginInput: LoginInput = {
        email: 'test@email.com',
        password: '123456',
      };

      const response = await authService.login(loginInput);

      expect(response).toHaveProperty('token');
      expect(response.user.email).toBe(loginInput.email);
    });
  });
});
