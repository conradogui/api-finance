const service = require('../services/category.services')
const { createCategorySchema, renameCategorySchema, categoryIdParamSchema} = require('../schema/category.schema')

const data = createCategorySchema.parse(req.body)

class CategoryController {
    async index(req, res) {
        try {
            const userId = req.user.id
            const items = await service.list(userId)
            res.json(items)
        } catch (err) {
            res.status(500).json({error: 'Erro ao listar categorias'})
        }
    }
    async create(req, res) {
        try {
            const userId = req.user.id
            const data = createCategorySchema.parse(req.body)
            const created = await service.create(userId, data, name)
            res.status(201).json(created)
        } catch (err) {
            const isZod = err && err.name === 'ZodError'
            res.status(isZod ? 422 : 400).json({error: err.message || 'Erro ao criar'})
        }
    }
    async update(req, res) {
        try {
            const userId = req.user.id
            const { id } = categoryIdParamSchema.parse(req.params)
            const data = renameCategorySchema.parse(req.body)
            const updated = await service.rename(userId, id, data.name)
            res.json(updated)
        } catch (err) {
            const isZod = err && err.name === 'ZodError'
            const code = isZod ? 422 : (err.message?.includes('não encontrada') ? 404 : 400)
            res.status(code).json({ error: err.message || 'Erro ao atualizar' })
        }
    }

    async destroy(req, res) {
        try {
            const userId = req.user.id
            const { id } = categoryIdParamSchema.parse(req.params)
            await service.remove(userId, id)
            res.status(204).send()
        } catch (err) {
            const isZod = err && err.name === 'ZodError'
            const code = isZod ? 422 : (err.message?.includes('não encontrada') ? 404 : 400)
            res.status(code).json({ error: err.message || 'Erro ao excluir' })
        }
    }
}

module.exports = new CategoryController()