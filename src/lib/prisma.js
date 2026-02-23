// Importa o PrismaClient gerado pelo Prisma para acessar o banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância única do PrismaClient para ser reutilizada na aplicação
const prisma = new PrismaClient()

// Exporta a instância para uso em serviços e repositórios
module.exports = prisma
