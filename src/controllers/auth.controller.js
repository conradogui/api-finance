const authService = require('../services/auth.services')
const { loginSchema } = require('../schema/auth.schema')

class AuthController {
  async login(req, res) {
    try {
      const data = loginSchema.parse(req.body)
      const result = await authService.login(data)
      res.status(200).json(result)
    } catch (err) {
      const isZodError = err && err.name === 'ZodError'
      const message = isZodError ? 'Dados inválidos' : err.message || 'Erro de autenticação'
      res.status(isZodError ? 422 : 401).json({ error: message })
    }
  }
}

module.exports = new AuthController()
