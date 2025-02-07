import { NotFoundException } from '@nestjs/common';
import { InMemoryPurchaseRepository } from 'src/test/repositories/purchases-in-memory.repository';

import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from 'src/test/repositories/auth-in-memory.repository';
import { User } from 'src/modules/auth/infra/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { InMemoryAddressRepository } from 'src/test/repositories/adresses-in-memory.repository';
import { CreateAddressInput } from '../domain/inputs/create-address.input';
import { UpdateAddressInput } from '../domain/inputs/update-address.input';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from '../infra/entities/adress.entity';

describe('AdressService', () => {
  let adressesService: AddressesService;
  let adressRepository: InMemoryAddressRepository;
  let userRepository: InMemoryUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        {
          provide: getRepositoryToken(Address),
          useClass: InMemoryAddressRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    adressesService = module.get<AddressesService>(AddressesService);
    adressRepository = module.get<InMemoryAddressRepository>(
      getRepositoryToken(Address),
    );
    userRepository = module.get<InMemoryUserRepository>(
      getRepositoryToken(User),
    );
  });

  afterEach(async () => {
    await adressRepository.clear();
    await userRepository.clear();
  });

  describe('findAll', () => {
    it('should return an empty list when there are no adresses', async () => {
      const adresses = await adressesService.findAll();
      expect(adresses).toEqual([]);
    });

    it('should return all adresses', async () => {
      await adressRepository.save({
        id: 1,
        cep: '09040140',
        number: '123A',
        city: 'Test City',
        state: 'TS',
        user: { id: 1, email: 'bruno@example.com' } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const adresses = await adressesService.findAll();
      expect(adresses).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('should return a adress when found', async () => {
      const user: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      } as User;
      adressRepository.addUser(user);

      await adressRepository.save({
        id: 1,
        cep: '09040140',
        number: '123A',
        city: 'Test City',
        state: 'TS',
        user: { id: 1, email: 'test@example.com' } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const adress = await adressesService.findOne(1);

      expect(adress).toBeDefined();
      expect(adress.id).toBe(1);
    });

    it('should throw NotFoundException when purchase is not found', async () => {
      await expect(adressesService.findOne(99)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a adress when user exists', async () => {
      const user: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      } as User;
      adressRepository.addUser(user);

      const adress = await adressRepository.save({
        id: 1,
        cep: '09040140',
        number: '123A',
        city: 'Test City',
        state: 'TS',
        user: { id: 1, email: 'test@example.com' } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      expect(adress).toBeDefined();
      expect(adress.id).toBe(1);
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      const input: CreateAddressInput = {
        userId: 99,
        cep: '09040140',
        number: '123A',
        city: 'Test City',
        state: 'TS',
      };

      await expect(adressesService.create(input)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a adress when found', async () => {
      await adressRepository.save({
        id: 1,
        cep: '09040140',
        number: '123A',
        city: 'Test City',
        state: 'TS',
        user: { id: 1, email: 'test@example.com' } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const input: UpdateAddressInput = {
        id: 1,
        cep: '09040140',
        number: '123A',
        city: 'Test City',
        state: 'TS',
      };

      const result = await adressesService.update(input);
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
    });

    it('should throw NotFoundException if adress does not exist', async () => {
      const input: UpdateAddressInput = {
        id: 99,
        cep: '09040140',
        number: '123A',
        city: 'Test City',
        state: 'TS',
      };

      await expect(adressesService.update(input)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a adress if it exists', async () => {
      await adressRepository.save({
        id: 1,
        cep: '09040140',
        number: '123A',
        city: 'Test City',
        state: 'TS',
        user: { id: 1, email: ' john@example.com' } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await adressesService.delete(1);
      expect(result.success).toBeTruthy();
    });

    it('should throw NotFoundException if adress does not exist', async () => {
      await expect(adressesService.delete(99)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
