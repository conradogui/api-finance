const prisma = require('../lib/prisma')

class CategoryRepository {
    async findAllByUserId(userId) {
        return prisma.category.findMany({
            where: {userId},
            select: {id: true, name: true},
            orderBy: {id: 'desc'}
        })
    }

    async findByNameForUser(userId, name) {
        return prisma.category.findFirst({
            where: {userId, name}
        })
    }

    async findByIdForUser(userId, id) {
        return prisma.category.findFirst({
            where: {id, userId}
        })
    }

    async create(userId, name) {
        return prisma.category.create({
            data: {userId, name},
            select: {id: true, name: true}
        })
    }

    async updateName(userId, id, name) {
        return prisma.category.update({
            where: {id},
            data: {name},
            select: {id: true, name: true}
        })
    }
    
    async deleteByIdForUser(userId, id) {
        return prisma.category.deleteMany({
            where: {id, userId}
        })
    }
}

module.exports = new CategoryRepository()