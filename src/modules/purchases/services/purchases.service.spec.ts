import { NotFoundException } from '@nestjs/common';
import { PurchasesService } from '../services/purchases.service';
import { InMemoryPurchaseRepository } from 'src/test/repositories/purchases-in-memory.repository';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from 'src/test/repositories/auth-in-memory.repository';
import { User } from 'src/modules/auth/infra/entities/user.entity';
import { CreatePurchaseInput } from '../domain/inputs/create-purchase.input';
import { UpdatePurchaseInput } from '../domain/inputs/update-purchase.input';

describe('PurchasesService', () => {
  let purchasesService: PurchasesService;
  let purchaseRepository: InMemoryPurchaseRepository;

  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    purchaseRepository = new InMemoryPurchaseRepository();
    userRepository = new InMemoryUserRepository();
    purchasesService = new PurchasesService(
      purchaseRepository as any,
      userRepository as any,
    );
  });

  afterEach(async () => {
    await purchaseRepository.clear();
    await userRepository.clear();
  });

  describe('findAll', () => {
    it('should return an empty list when there are no purchases', async () => {
      const purchases = await purchasesService.findAll();
      expect(purchases).toEqual([]);
    });

    it('should return all purchases', async () => {
      await purchaseRepository.save({
        id: 1,
        totalAmount: 100,
        purchaseDate: new Date(),
        user: { id: 1, email: 'test@example.com' } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const purchases = await purchasesService.findAll();
      expect(purchases).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('should return a purchase when found', async () => {
      await userRepository.create({
        id: 1,
        email: 'brunocaneo3@gmail.com',
        password: '123456',
        name: 'Bruno',
      } as User);

      await purchaseRepository.save({
        id: 1,
        totalAmount: 100,
        purchaseDate: new Date(),
        user: { id: 1, email: 'test@example.com' } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const purchase = await purchasesService.findOne(1);
      expect(purchase).toBeDefined();
      expect(purchase.id).toBe(1);
    });

    it('should throw NotFoundException when purchase is not found', async () => {
      await expect(purchasesService.findOne(99)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a purchase when user exists', async () => {
      await userRepository.create({
        id: 1,
        email: 'brunocaneo3@gmail.com',
        password: '123456',
        name: 'Bruno',
      } as User);

      const input: CreatePurchaseInput = {
        userId: 1,
        totalAmount: 200,
        purchaseDate: new Date(),
      };

      const purchase = await purchasesService.create(input);
      expect(purchase.id).toBeDefined();
      expect(purchase.totalAmount).toBe(200);
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      const input: CreatePurchaseInput = {
        userId: 99,
        totalAmount: 200,
        purchaseDate: new Date(),
      };

      await expect(purchasesService.create(input)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a purchase when found', async () => {
      await purchaseRepository.save({
        id: 1,
        totalAmount: 100,
        purchaseDate: new Date(),
        user: { id: 1, email: 'test@example.com' } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const input: UpdatePurchaseInput = {
        totalAmount: 300,
        id: 1,
      };

      const updatedPurchase = await purchasesService.update(input);
      expect(updatedPurchase.totalAmount).toBe(300);
    });

    it('should throw NotFoundException if purchase does not exist', async () => {
      const input: UpdatePurchaseInput = {
        id: 99,
        totalAmount: 300,
      };

      await expect(purchasesService.update(input)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a purchase if it exists', async () => {
      await purchaseRepository.save({
        id: 1,
        totalAmount: 100,
        purchaseDate: new Date(),
        user: { id: 1, email: 'test@example.com' } as User,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await purchasesService.delete(1);
      expect(result.success).toBeTruthy();
    });

    it('should throw NotFoundException if purchase does not exist', async () => {
      await expect(purchasesService.delete(99)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
