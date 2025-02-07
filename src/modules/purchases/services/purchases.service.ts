import { InjectRepository } from '@nestjs/typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/modules/auth/domain/entities/user.entity';
import { Purchase } from '../domain/entities/purchase.entity';
import { CreatePurchaseInput } from '../infra/inputs/create-purchase.input';
import { UpdatePurchaseInput } from '../infra/inputs/update-purchase.input';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }

    return purchase;
  }

  async create(input: CreatePurchaseInput): Promise<Purchase> {
    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${input.userId} not found`);
    }

    const purchase = this.purchaseRepository.create({ ...input, user });
    return this.purchaseRepository.save(purchase);
  }

  async update(input: UpdatePurchaseInput): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({
      where: { id: input.id },
    });

    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${input.id} not found`);
    }

    Object.assign(purchase, input);
    return this.purchaseRepository.save(purchase);
  }

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const purchase = await this.purchaseRepository.findOne({
      where: { id },
    });

    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }

    await this.purchaseRepository.delete(id);

    return {
      success: true,
      message: `Purchase with ID ${id} has been deleted`,
    };
  }
}
