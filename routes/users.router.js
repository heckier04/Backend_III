import { Router } from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = Router()


router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json({ status: 'success', payload: users })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
})


router.post('/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    })
    res.status(201).json({ status: 'success', payload: newUser })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id)
    if (!result) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' })
    res.json({ status: 'success', message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
})

export default router
