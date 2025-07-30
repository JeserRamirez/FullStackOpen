const { GraphQLError } = require('graphql')

const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')

      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author.name === args.author && book.genres.includes(args.genre)
        )
      }

      if (args.author) {
        return books.filter((book) => book.author.name === args.author)
      }

      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre))
      }

      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})

      // Aggregate: cuenta cuántos libros hay por autor
      const bookCounts = await Book.aggregate([
        {
          $group: {
            _id: '$author',
            count: { $sum: 1 },
          },
        },
      ])

      // Mapea los conteos a un objeto: { authorId: count }
      const bookCountMap = {}
      bookCounts.forEach(({ _id, count }) => {
        bookCountMap[_id.toString()] = count
      })

      // Construir los autores con bookCount
      return authors.map((author) => ({
        name: author.name,
        id: author._id,
        born: author.born,
        bookCount: bookCountMap[author._id.toString()] || 0,
      }))
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      try {
        if (args.title.length < 2) {
          throw new GraphQLError('Title must be at least 2 characters long', {
            extensions: {
              code: 'BAD_USER_INPUT',
              argumentName: 'title',
            },
          })
        }

        if (args.author.length < 4) {
          throw new GraphQLError(
            'Author name must be at least 4 characters long',
            {
              extensions: {
                code: 'BAD_USER_INPUT',
                argumentName: 'author',
              },
            }
          )
        }

        let author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id,
        })

        await book.save()
        const populatedBook = await book.populate('author')

        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

        return populatedBook
      } catch (error) {
        throw new GraphQLError('Failed to add book', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error,
          },
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      try {
        const author = await Author.findOne({ name: args.name })

        if (!author) {
          throw new GraphQLError('Author not found', {
            extensions: {
              code: 'NOT_FOUND',
              argumentName: 'name',
            },
          })
        }

        author.born = args.setBornTo
        await author.save()

        return author
      } catch (error) {
        throw new GraphQLError('Failed to edit author', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

module.exports = resolvers
