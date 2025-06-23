import mongoose from 'mongoose'

const adoptionSchema = new mongoose.Schema({
  petId: {                         
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',                    
    required: true
  },
  userId: {                        
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',                   
    required: true
  },
  adoptionDate: {                
    type: Date,
    default: Date.now
  }
})

const AdoptionModel = mongoose.model('Adoption', adoptionSchema)
export default AdoptionModel
