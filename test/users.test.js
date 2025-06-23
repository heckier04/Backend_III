import request from 'supertest'
import app from '../app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL)
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe(' Tests funcionales - Users Router', () => {
    let createdUserId

    const mockUser = {
        first_name: 'Test',
        last_name: 'User',
        email: `testuser${Date.now()}@example.com`,
        password: 'coder123'
    }

    it('POST /api/users - debe crear un usuario', async () => {
        const response = await request(app)
        .post('/api/users')
        .send(mockUser)

    expect(response.statusCode).toBe(201)
    expect(response.body.status).toBe('success')
    expect(response.body.payload).toHaveProperty('_id')
    createdUserId = response.body.payload._id
    }, 10000)

    it('GET /api/users - debe obtener todos los usuarios', async () => {
        const response = await request(app).get('/api/users')

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('success')
        expect(Array.isArray(response.body.payload)).toBe(true)
    }, 10000)

    it('DELETE /api/users/:id - debe eliminar el usuario creado', async () => {
        const response = await request(app).delete(`/api/users/${createdUserId}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('success')
    }, 10000)
})
