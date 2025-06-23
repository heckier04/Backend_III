import { Router } from 'express';
import AdoptionModel from '../models/adoption.js';

const router = Router();


router.get('/', async (req, res) => {
  try {
    const adoptions = await AdoptionModel.find()
      .populate('petId')     
      .populate('userId')     
    res.json({ status: 'success', payload: adoptions })
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message })
  }
})


router.post('/', async (req, res) => {
  const { petId, userId } = req.body
  if (!petId || !userId) {
    return res.status(400).json({ status: 'error', message: 'petId y userId son requeridos' })
  }

  try {
    const adoption = await AdoptionModel.create({ petId, userId })
    res.status(201).json({ status: 'success', payload: adoption })
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message })
  }
})

// 🗑 DELETE /api/adoptions/:id → Eliminar una adopción por ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await AdoptionModel.findByIdAndDelete(req.params.id)
    if (!result) {
      return res.status(404).json({ status: 'error', message: 'Adopción no encontrada' })
    }
    res.json({ status: 'success', message: 'Adopción eliminada' })
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message })
  }
})

export default router;
