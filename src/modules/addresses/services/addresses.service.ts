import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../entities/adress.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateAddressInput } from '../graphql/inputs/create-address.input';
import { UpdateAddressInput } from '../graphql/inputs/update-address.input';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Address[]> {
    return this.addressRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Address> {
    return this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async create(input: CreateAddressInput): Promise<Address> {
    const user = await this.userRepository.findOne({
      where: { id: input.userId },
      relations: ['addresses'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${input.userId} not found`);
    }

    if (this.verifyAddressExists(user.addresses, input.cep)) {
      throw new BadRequestException(
        `User already has an address registered with CEP: ${input.cep}`,
      );
    }

    const address = this.addressRepository.create({ ...input, user });
    return this.addressRepository.save(address);
  }

  async update(id: number, input: UpdateAddressInput): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    if (input.userId && input.cep) {
      const user = await this.userRepository.findOne({
        where: { id: input.userId },
        relations: ['addresses'],
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${input.userId} not found`);
      }

      if (
        this.verifyAddressExists(user.addresses, input.cep) &&
        address.cep !== input.cep
      ) {
        throw new BadRequestException(
          `User already has an address registered with CEP: ${input.cep}`,
        );
      }
    }

    Object.assign(address, input);
    return this.addressRepository.save(address);
  }

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    await this.addressRepository.delete(id);
    return { success: true, message: `Address with ID ${id} has been deleted` };
  }

  private verifyAddressExists(
    userAddresses: Array<Address>,
    inputCep: string,
  ): boolean {
    return userAddresses.some((address) => address.cep === inputCep);
  }
}
