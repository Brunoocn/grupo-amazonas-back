import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from '../entities/purchase.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

import { CreatePurchaseInput } from '../graphql/inputs/create-purchase.input';
import { UpdatePurchaseInput } from '../graphql/inputs/update-purchase.input';

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
    return await this.purchaseRepository.findOne({
      where: { id },
      relations: ['user'],
    });
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

  async update(id: number, input: UpdatePurchaseInput): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({ where: { id } });

    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }

    Object.assign(purchase, input);
    return this.purchaseRepository.save(purchase);
  }

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const purchase = await this.purchaseRepository.findOne({ where: { id } });

    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }

    await this.purchaseRepository.delete({ id });
    return {
      success: true,
      message: `Purchase with ID ${id} has been deleted`,
    };
  }
}
