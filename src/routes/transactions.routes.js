const express = require('express')
const auth = require('../middleware/auth.middleware')

const transactionController = require('../controllers/transaction.controller')
const router = express.Router()
router.use(auth)

router.post("/", transactionController.create)
router.get("/", transactionController.index)
router.put("/:id", transactionController.update)
router.delete("/:id", transactionController.destroy)

module.exports = router