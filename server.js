import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config() // ✅ importante para leer el .env

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('🔌 Conectado a MongoDB Atlas'))
    .catch((err) => console.error('❌ Error al conectar a MongoDB:', err))
