const prisma = require('../lib/prisma')

class Userrepository {
    async create(data) {
        return prisma.user.create({data})
    }

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

module.exports = new Userrepository()
