import { DataSource } from 'typeorm';
import { randomUUID } from 'crypto';
import 'dotenv/config';
import { execSync } from 'child_process';

const schemaId = randomUUID();

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.');
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schemaId);
  return url.toString();
}

const databaseUrl = generateUniqueDatabaseUrl(schemaId);

const testDataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  synchronize: true,
  entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  schema: schemaId,
});

beforeAll(async () => {
  process.env.DATABASE_URL = databaseUrl;

  await testDataSource.initialize();

  execSync('yarn typeorm migration:run', { stdio: 'inherit' });
});

afterAll(async () => {
  await testDataSource.query(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await testDataSource.destroy();
});
