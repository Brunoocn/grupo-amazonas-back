import { BadRequestException } from '@nestjs/common';
import { User } from 'src/modules/auth/infra/entities/user.entity';

export class InMemoryUserRepository {
  private users: User[] = [];

  async findOne({ where }: { where: { email: string } }): Promise<User | null> {
    return this.users.find((user) => user.email === where.email) || null;
  }

  async save(user: User): Promise<User> {
    const exists = this.users.find((u) => u.email === user.email);
    if (exists) {
      throw new BadRequestException(
        `User with email ${user.email} already exists`,
      );
    }
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async clear() {
    this.users = [];
  }
}
