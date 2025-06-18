const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxLikes, blog) => {
    return blog.likes > maxLikes.likes ? blog : maxLikes
  })
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const grouped = _.countBy(blogs, 'author')

  const topAuthor = _.maxBy(_.keys(grouped), (author) => grouped[author])

  return {
    author: topAuthor,
    blogs: grouped[topAuthor],
  }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const grouped = _.groupBy(blogs, 'author')

  const likesByAuthor = _.map(grouped, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes'),
  }))

  return _.maxBy(likesByAuthor, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
