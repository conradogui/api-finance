require('dotenv').config()
const prisma = require('../lib/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService {
  async login(data) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (!user) throw new Error('Usuário ou senha inválidos')

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) throw new Error('Usuário ou senha inválidos')

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token
    }
  }
}

module.exports = new AuthService()
