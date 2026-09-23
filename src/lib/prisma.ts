import { PrismaClient } from '@prisma/client';
import path from 'path';

// If no DATABASE_URL is configured, provide a graceful fallback to the local/bundled SQLite database
if (!process.env.DATABASE_URL && !process.env.POSTGRES_PRISMA_URL) {
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
  process.env.DATABASE_URL = `file:${dbPath}`;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
