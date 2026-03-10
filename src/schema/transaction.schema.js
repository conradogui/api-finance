const { z } = require('zod')

const TransactionTypeEnum = z.enum(['INCOME', 'EXPENSE']) //so aceita income (receitas) e expense (despesas)

const amountSchema = z.union([ //validação do zod para aceitar tanto string quanto número
  z.string().trim().regex(/^\d+(\.\d{1,2})?$/, 'Valor inválido'), // se for string, aceita até 2 casas decimais com a expressão regular
  z.number().positive() //se for número, aceita apenas valores positivos
]).transform(v => { //modifica o valor após a validação para garantir 2 casas decimais
  const num = typeof v === 'number' ? v : Number(v) //converte para número se for string
  return num.toFixed(2) // Retorna uma string com 2 casas decimais
})

exports.createTransactionSchema = z.object({ //schema de post para criação de transação
  title: z.string().trim().min(1),
  amount: amountSchema, 
  type: TransactionTypeEnum,
  date: z.coerce.date(), // aceita string ISO e converte para Date
  categoryId: z.coerce.number().int().positive().optional() 
})

exports.updateTransactionSchema = z.object({ //schema de put para atualização de transação
  title: z.string().trim().min(1).optional(), //Titulo opcional para atualização de transação
  amount: amountSchema.optional(),
  type: TransactionTypeEnum.optional(),
  date: z.coerce.date().optional(),
  categoryId: z.coerce.number().int().positive().optional()
}).refine(obj => Object.keys(obj).length > 0, { message: 'Nada para atualizar' }) //aceita apenas um campo para atualização

exports.transactionIdParamSchema = z.object({ //schema de parâmetro de id para transação (aceita apenas números inteiros positivos)
  id: z.coerce.number().int().positive()
})

exports.listTransactionsQuerySchema = z.object({ //schema de query para listar transações
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  type: TransactionTypeEnum.optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  order: z.enum(['asc', 'desc']).default('desc')
})