// Importa o serviço de autenticação, que executa a lógica de login e gera o token
const authService = require('../services/auth.services')
// Importa o schema Zod para validar o corpo da requisição de login
const { loginSchema } = require('../schema/auth.schema')

// Controller organiza a entrada/saída HTTP e delega regras ao serviço
class AuthController {
  // Handler da rota POST /auth/login
  async login(req, res) {
    try {
      // Valida o body (email, password) com Zod; lança erro se inválido
      const data = loginSchema.parse(req.body)
      // Delegação ao serviço: verifica usuário e senha e gera JWT
      const result = await authService.login(data)
      // Retorna sucesso com dados públicos do usuário e o token
      res.status(200).json(result)
    } catch (err) {
      // Tratamento de erros: diferencia erro de validação (422) de autenticação (401)
      const isZodError = err && err.name === 'ZodError'
      const message = isZodError ? 'Dados inválidos' : err.message || 'Erro de autenticação'
      res.status(isZodError ? 422 : 401).json({ error: message })
    }
  }
}

// Exporta uma instância do controller para uso nas rotas
module.exports = new AuthController()
