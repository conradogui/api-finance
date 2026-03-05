const prisma = require('../lib/prisma')

class TransactionRepository {
    async findManyForUser (userId, { startDate, endDate, type, categoryId, page = 1, limit = 20, order = 'desc'} = {}) {
        const where = { userId, 
            ...(type ? { type} : {}), 
            ...(categoryId ? {categoryId} : {}), 
            ...(startDate || endDate ? {
                date: {
                    ...(startDate ? {gte: new Date(startDate)} : {}),
                    ...(endDate ? {lte: new Date(endDate)} : {})
                }
            } : {})
        }
        return prisma.transaction.findMany({
            where,
            select: {
                id: true,
                title: true,
                amount: true,
                type: true,
                date: true,
                category: {select: {id: true, name: true}}
            },
            orderBy: {date: order},
            skip: (page - 1) * limit,
            take: limit
        })
    }

    async findByIdForUser (userId, id) {
        return prisma.transaction.findFirst({
            where: {id, userId},
            select: {
                id: true,
                title: true,
                amount: true,
                type: true,
                date: true,
                category: {select: {id: true, name: true}}
            }
        })
    }

    async create (userId, {title, amount, type, date, categoryId}) {
        return prisma.transaction.create({
            data: {userId, title, amount, type, date, categoryId},
            select: {id: true, title: true, amount: true, type: true, date: true, category: true} //posso ajustar o category para ele não vir a relação toda
        })
    }

    async updateByIdForUser (userId, id, data) {
        return prisma.transaction.update({
            where: {id},
            data,
            select: {id: true, title: true, amount: true, type: true, date: true, categoryId: true}
        })
    }

    async deleteByIdForUser (userId, id) {
        return prisma.transaction.deleteMany({where: {id, userId}})
    }

    async totalsByTypeForPeriod (userId, {startDate, endDate}) {
        const where = {
            userId,
            ...(startDate || endDate ? {
                date: {
                    ...(startDate ? {gte: new Date(startDate)} : {}),
                    ...(endDate ? {lte: new Date(endDate)} : {})
                }
            } : {})
        }
        return prisma.transaction.groupBy({
            by: ['type'], //aqui estou agrupando por tipo de transação (INCOME/EXPENSE)
            where,
            _sum: {amount: true}
        })
    }

    async totalsByCategoryForPeriod (userId, {startDate, endDate}) {
        const where = {
            userId,
            ...(startDate || endDate ? {
                date: {
                    ...(startDate ? {gte: new Date(startDate)} : {}),
                    ...(endDate ? {lte: new Date(endDate)} : {})
                }
            } : {})
        }
        return prisma.transaction.groupBy({
            by: ['categoryId', 'type'], //agrupa por categoria e tipo
            where,
            _sum: {amount: true}
        })
    }
}

module.exports = new TransactionRepository()