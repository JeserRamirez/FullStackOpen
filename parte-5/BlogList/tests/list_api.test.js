const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('../utils/list_api_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  const savedUser = await user.save()

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: savedUser._id })
  )
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

const getToken = async () => {
  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })

  return `Bearer ${response.body.token}`
}

test('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('verifies that the unique identifier property of the blog posts is named id', async () => {
  const blogs = await helper.blogsInDB()
  const keys = Object.keys(blogs[0])

  assert.ok(keys.includes('id'))
})

test('successfully creates a new blog post, verify that the total number of blogs in the system is increased by on and verify that the content of the blog post is saved correctly to the database.', async () => {
  const newBlog = {
    title: 'Programacion Java',
    author: 'dager',
    url: 'https://javaaprende.com',
    likes: 4500,
  }

  const token = await getToken()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map((n) => n.title)
  assert(contents.includes('Programacion Java'))
})

test('adding a blog fails with status code 401 if token is not provided', async () => {
  const newBlog = {
    title: 'Sin token',
    author: 'hacker',
    url: 'http://hackblog.com',
    likes: 100,
  }

  await api.post('/api/blogs').send(newBlog).expect(401)
})

test('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'Aprende VibeCodign',
    author: 'QM',
    url: 'http://VibeCoding.com/sinlikes',
  }

  const token = await getToken()

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
  // url missing
  const newBlog = {
    title: 'Aprende Python',
    author: 'marco',
    likes: 4500,
  }

  const token = await getToken()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', token)
    .expect(400)

  // title missing
  const newBlog2 = {
    author: 'marco',
    url: 'http://python.com',
    likes: 4500,
  }

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .set('Authorization', token)
    .expect(400)
})

test('succeeds to update the blog', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToUpdate = blogsAtStart[0]

  const newAtributes = {
    likes: 2000,
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newAtributes).expect(200)

  const blogsAtEnd = await helper.blogsInDB()
  const updatedBlog = blogsAtEnd[0]

  assert.notDeepStrictEqual(updatedBlog, blogToUpdate)
})

test('succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToDelete = blogsAtStart[0]

  const token = await getToken()

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', token)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDB()

  const contents = blogsAtEnd.map((r) => r.title)
  assert(!contents.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('', async () => {})

after(async () => {
  await mongoose.connection.close()
})
