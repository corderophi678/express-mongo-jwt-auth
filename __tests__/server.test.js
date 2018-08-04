const request = require('supertest')
const { app } = require('../server')

describe('Testing the root path', () => {
  test('It should respond to a GET request', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.ok).toBeTruthy()
  })
})
