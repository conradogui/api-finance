const repo = require('../repositories/category.repository')

class CategoryService {
    async list(userId) {
        return repo.findAllByUserId(userId)
    }
    //cria um nome de uma categoria
    async create(userId, name) {
        const exists = await repo.findByNameForUser(userId, name)
        if(exists) throw new Error('Categoria já existe')
        return repo.create(userId, name)
    }
    // renoemeia a categoria específica
    async rename(userId, id, name) {
        const current = await repo.findByIdForUser(userId, id)
        if(!current) throw new Error('Categoria não encontrada')
        const dup = await repo.findByNameForUser(userId, name)
        if(dup && dup.id !== id) throw new Error('Categoria já existe')
        return repo.updateName(userId, id, name)
    }
    //remove a categoria
    async remove(userId, id) {
        const result = await repo.deleteByIdForUser(userId, id)
        if (result.count === 0) throw new Error('Categoria não encontrada')
    }
}
 
module.exports = new CategoryService()