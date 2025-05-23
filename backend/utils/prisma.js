const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
});

// Enable query logging for slow queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    if (e.duration > 1000) { // Log queries taking longer than 1 second
      // console.log(` Slow query (${e.duration}ms):`, e.query.substring(0, 100) + '...');
    }
  });
}

module.exports = prisma;