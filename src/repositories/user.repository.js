// Instância Prisma para executar consultas ao banco de dados
const prisma = require('../lib/prisma')

// Repositório de usuário: centraliza queries do modelo User
class Userrepository {
    // Cria um usuário com os dados informados
    async create(data) {
        return prisma.user.create({data})
    }

    // Busca usuário único pelo campo de email (índice/unique no banco)
    async findByEmail(email) {
        return prisma.user.findUnique({where: {email}})
    }

    async findAll() {
        return prisma.user.findMany({
            select: { id: true, name: true,
                email: true, createdAt: true
            }, 
            orderBy: {createdAt: 'desc'}
        })
    }
}

// Exporta uma instância do repositório para uso nos serviços
module.exports = new Userrepository()
