// test/repositories/in-memory-address.repository.ts

import { Address } from 'src/modules/addresses/infra/entities/adress.entity';
import { User } from 'src/modules/auth/infra/entities/user.entity';

export class InMemoryAddressRepository {
  private addresses: Address[] = [];
  private users: User[] = [];
  private addressId = 1;

  async find(options?: any): Promise<Address[]> {
    return this.addresses;
  }

  async findOne(options: {
    where: { id: number };
    relations?: string[];
  }): Promise<Address | null> {
    const { id } = options.where;
    return this.addresses.find((address) => address.id === id) || null;
  }

  async addUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  create(input: Partial<Address>): Address {
    return { ...input } as Address;
  }

  async save(address: Address): Promise<Address> {
    if (!address.id) {
      address.id = this.addressId++;
      this.addresses.push(address);
    } else {
      const index = this.addresses.findIndex((a) => a.id === address.id);
      if (index !== -1) {
        this.addresses[index] = address;
      } else {
        this.addresses.push(address);
      }
    }
    return address;
  }

  async delete(id: number): Promise<void> {
    this.addresses = this.addresses.filter((a) => a.id !== id);
  }

  async clear(): Promise<void> {
    this.addresses = [];
    this.addressId = 1;
  }
}
