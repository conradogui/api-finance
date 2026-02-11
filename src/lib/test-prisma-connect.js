const prisma = require('./prisma')

async function main() {
  try {
    await prisma.$connect()
    console.log('Prisma conectado com sucesso')
  } catch (e) {
    console.error('Erro ao conectar Prisma:', e && e.message ? e.message : e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
