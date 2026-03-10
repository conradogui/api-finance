const transactionService = require("../services/transactions.services")
const { createTransactionSchema, updateTransactionSchema, transactionIdParamSchema, listTransactionsQuerySchema } = require("../schema/transaction.schema.js")

class TransactionController {
    async index(req, res) { //Lista transações com base nos parâmetros fornecidos
        try {
            const userId = req.user.id
            const items = await transactionService.list(userId)
            res.status(200).json(items)
        } catch (err) {
            res.status(500).json({ error: 'Erro ao listar transações' })
        }
    }

    async create(req, res) { //Cria uma nova transação
        try {
            const userId = req.user.id
            const data = createTransactionSchema.parse(req.body)
            const created = await transactionService.create(userId, data)
            res.status(201).json(created)
        } catch (err) {
            const isZod = err && err.name === 'ZodError'
            res.status(isZod ? 400 : 500).json({ error: err.message || 'Erro ao criar transação' })
        }
    }

    async update(req, res) { //Atualiza uma transação existente
        try {
            const userId = req.user.id
            const { id } = transactionIdParamSchema.parse(req.params)
            const data = updateTransactionSchema.parse(req.body)
            const updated = await transactionService.update(userId, id, data)
            res.status(200).json(updated)
        } catch (err) {
            const isZod = err && err.name === 'ZodError'
            const code = isZod ? 422 : (err.message?.includes('Transação não encontrada') ? 404 : 400)
            res.status(code).json({ error: err.message || 'Erro ao atualizar transação' })
        }
    }
    

    async destroy(req, res) { //Deleta uma transação existente
        try {
            const userId = req.user.id
            const { id } = transactionIdParamSchema.parse(req.params)
            await transactionService.remove(userId, id)
            res.status(204).send()
        } catch (err) {
            const isZod = err && err.name === 'ZodError'
            const code = isZod ? 422 : (err.message?.includes('Transação não encontrada') ? 404 : 400)
            res.status(code).joson({error: err.message || 'Erro ao excluir transação'})
        }
    }

}

module.exports = new TransactionController()