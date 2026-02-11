const prisma = require('../lib/prisma')

class Userrepository {
    async create(data) {
        return prisma.user.create({data})
    }

    async findByEmail(email) {
        return prisma.user.findUnique({where: {email}}) //erro
    }
}

module.exports = new Userrepository()