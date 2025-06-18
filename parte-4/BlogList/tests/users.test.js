const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test.only('should not create invalid users', async () => {
  const invalidUsers = [
    { username: 'su', name: 'short username', password: 'validpassword' }, // username muy corto
    { username: 'validuser', name: 'short password', password: '12' }, // password muy corta
    { username: '', name: 'empty username', password: 'validpassword' }, // username vacío
  ]

  for (const invalidUser of invalidUsers) {
    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body.error, 'Debe contener mensaje de error')
    assert.match(
      response.body.error,
      /username|password/,
      'El mensaje de error debe mencionar el campo inválido'
    )
  }
})

after(async () => {
  await mongoose.connection.close()
})
