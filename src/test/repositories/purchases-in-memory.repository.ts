import { User } from 'src/modules/auth/domain/entities/user.entity';
import { Purchase } from 'src/modules/purchases/domain/entities/purchase.entity';

export class InMemoryPurchaseRepository {
  private purchases: Purchase[] = [];
  private users: User[] = [];
  private purchaseId = 1;

  async find(): Promise<Purchase[]> {
    return this.purchases;
  }

  async findOne({
    where,
  }: {
    where: { id: number };
  }): Promise<Purchase | null> {
    return this.purchases.find((purchase) => purchase.id === where.id) || null;
  }

  async findUserById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async addUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async save(purchase: Purchase): Promise<Purchase> {
    if (!purchase.id) {
      purchase.id = this.purchaseId++;
    }
    this.purchases = this.purchases.filter((p) => p.id !== purchase.id);
    this.purchases.push(purchase);
    return purchase;
  }

  async delete({ id }: { id: number }): Promise<void> {
    this.purchases = this.purchases.filter((purchase) => purchase.id !== id);
  }

  async clear(): Promise<void> {
    this.purchases = [];
    this.users = [];
    this.purchaseId = 1;
  }
}
