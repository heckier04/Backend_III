import mongoose from 'mongoose'

const adoptionSchema = new mongoose.Schema({
  petId: {                         // ID de la mascota adoptada
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',                    // Se relaciona con el modelo Pet
    required: true
  },
  userId: {                        // ID del usuario que adoptó
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',                   // Se relaciona con el modelo User
    required: true
  },
  adoptionDate: {                 // Fecha automática de adopción
    type: Date,
    default: Date.now
  }
})

const AdoptionModel = mongoose.model('Adoption', adoptionSchema)
export default AdoptionModel
