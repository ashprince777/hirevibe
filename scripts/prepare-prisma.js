const fs = require('fs');
const path = require('path');

// Determine database target from environment
const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || '';
const isPostgres = dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
if (fs.existsSync(schemaPath)) {
  let content = fs.readFileSync(schemaPath, 'utf8');

  if (isPostgres) {
    console.log('[HireVibe] Remote PostgreSQL database detected. Setting Prisma provider to postgresql...');
    content = content.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
  } else {
    console.log('[HireVibe] SQLite database mode active. Setting Prisma provider to sqlite...');
    content = content.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
  }

  // Ensure url uses env("DATABASE_URL")
  if (!content.includes('url      = env("DATABASE_URL")')) {
    content = content.replace(/url\s*=\s*"[^"]*"/g, 'url      = env("DATABASE_URL")');
  }

  fs.writeFileSync(schemaPath, content, 'utf8');
  console.log('[HireVibe] prisma/schema.prisma successfully prepared.');
}
