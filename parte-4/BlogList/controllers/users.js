const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password === undefined) {
    return response.status(400).json({ error: 'password is missing' })
  } else if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password must be longer than 3 characters' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await newUser.save()

  response.status(200).json(savedUser)
})

module.exports = usersRouter
