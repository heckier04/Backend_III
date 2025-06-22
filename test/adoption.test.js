import request from 'supertest'
import app from '../app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()


const testUserId = new mongoose.Types.ObjectId()
const testPetId = new mongoose.Types.ObjectId()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe(' Tests funcionales - Adoption Router', () => {

    let createdAdoptionId

    it('POST /api/adoptions - debe crear una adopción', async () => {
        const response = await request(app)
            .post('/api/adoptions')
            .send({
        userId: testUserId.toString(),
        petId: testPetId.toString()
        })

    expect(response.statusCode).toBe(201)
    expect(response.body.status).toBe('success')
    createdAdoptionId = response.body.payload._id
    })

    it('GET /api/adoptions - debe obtener todas las adopciones', async () => {
        const response = await request(app).get('/api/adoptions')

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('success')
        expect(Array.isArray(response.body.payload)).toBe(true)
    })

    it('DELETE /api/adoptions/:id - debe eliminar la adopción creada', async () => {
        const response = await request(app).delete(`/api/adoptions/${createdAdoptionId}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('success')
    })
})
