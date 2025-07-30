import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: [...dataInStore.allBooks, addedBook] },
      })
    }

    // ✅ Actualizar ALL_AUTHORS
    try {
      const dataInAuthors = client.readQuery({ query: ALL_AUTHORS })
      const author = addedBook.author

      const existingAuthor = dataInAuthors.allAuthors.find(
        (a) => a.name === author.name
      )

      if (!existingAuthor) {
        // Autor nuevo → agregar con bookCount: 1
        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            allAuthors: dataInAuthors.allAuthors.concat({
              ...author,
              bookCount: 1,
            }),
          },
        })
      } else {
        // Autor existente → actualizar bookCount
        const updatedAuthors = dataInAuthors.allAuthors.map((a) =>
          a.name === author.name ? { ...a, bookCount: a.bookCount + 1 } : a
        )

        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            allAuthors: updatedAuthors,
          },
        })
      }
    } catch (error) {
      console.error('Error updating ALL_AUTHORS cache:', error)
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      updateCacheWith(addedBook)

      window.alert(
        `${addedBook.title} by ${addedBook.author.name} has been added`
      )
    },
  })

  return (
    <div>
      {!token ? (
        <>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('login')}>login</button>
          </div>

          <LoginForm
            show={page === 'login'}
            setToken={setToken}
            setPage={setPage}
          />

          <Authors show={page === 'authors'} />

          <Books show={page === 'books'} />
        </>
      ) : (
        <>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>
              recommend
            </button>
            <button
              onClick={() => {
                logout()
                setPage('login')
              }}
            >
              logout
            </button>
          </div>

          <Authors show={page === 'authors'} />

          <Books show={page === 'books'} />

          <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />

          <Recommend show={page === 'recommendations'} />
        </>
      )}
    </div>
  )
}

export default App
