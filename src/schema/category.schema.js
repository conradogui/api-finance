const {z} = require('zod')

exports.createCategorySchema = z.object({
    name: z.string().trim().min(1, 'Nome é obrigatório').max(50)
})
exports.renameCategorySchema = z.object({
    name: z.string().trim().min(1, 'Nome é obrigatório').max(50)
})
exports.categoryIdParamSchema = z.object({ //o que esse codigo faz?
    id: z.coerce.number().int().positive()
})