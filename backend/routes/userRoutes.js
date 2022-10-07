const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controller/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUserProfile)

module.exports = router
