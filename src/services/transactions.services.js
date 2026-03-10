const tranRepo = require('../repositories/transactions.repository')
const catRepo = require('../repositories/category.repository')

class TransactionService {
    async list (userId, query) { 
        return tranRepo.findManyForUser(userId, query)
    }

    async create (userId, data) {
        const category = await catRepo.findByIdForUser(userId, data.categoryId)
        if(!data.categoryId) data.categoryId = category.id
        if(!category) throw new Error('Categoria não encontrada')
        return tranRepo.create(userId, data)
    }

    async update (userId, id, data) {
        const current = await tranRepo.findByIdForUser(userId, id)
        if(!current) throw new Error('Transação não encontrada')
        if(data.categoryId) {
            const cat = await catRepo.findByIdForUser(userId, data.categoryId)
            if(!cat) throw new Error('Categoria não encontrada')
        }
    return tranRepo.updateByIdForUser(userId, id, data)
    }

    async remove (userId, id) {
        const result = await tranRepo.deleteByIdForUser(userId, id)
        if (result.count === 0) throw new Error('Transação não encontrada')
    }

    async totalsByType (userId, query) {
        return tranRepo.totalsByTypeForPeriod(userId, query)
    }

    async totalsByCategory (userId, period) {
        return tranRepo.totalsByCategoryForPeriod(userId, period)
    }
}

module.exports = new TransactionService()