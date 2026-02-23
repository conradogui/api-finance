// Carrega variáveis de ambiente (ex.: JWT_SECRET) do arquivo .env
require('dotenv').config()
// Instância única do Prisma para acessar o banco de dados
const prisma = require('../lib/prisma')
// Biblioteca para comparar senha informada com o hash armazenado
const bcrypt = require('bcrypt')
// Biblioteca para assinar e verificar tokens JWT
const jwt = require('jsonwebtoken')

class AuthService {
  // Executa o fluxo de login: valida credenciais e gera token
  async login(data) {
    // Busca usuário pelo email informado
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })

    // Se não existir usuário com esse email, retorna erro genérico
    if (!user) throw new Error('Usuário ou senha inválidos')

    // Compara a senha enviada com o hash salvo no banco
    const passwordMatch = await bcrypt.compare(data.password, user.password)

    // Se a senha não bater, retorna erro genérico
    if (!passwordMatch) throw new Error('Usuário ou senha inválidos')

    // Assina um token JWT com o id do usuário; expira em 1 dia
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    // Retorna dados públicos do usuário e o token para o cliente
    return {
      user: { id: user.id, name: user.name, email: user.email },
      token
    }
  }
}

// Exporta uma instância do serviço para ser usada pelos controllers
module.exports = new AuthService()
