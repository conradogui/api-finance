const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || ''
  const [type, token] = auth.split(' ')
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token ausente' })
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: payload.id }
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}