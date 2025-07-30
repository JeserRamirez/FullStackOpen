import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreSelected, setGenreSelected] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = [...new Set(books.flatMap((b) => b.genres))]

  const filteredBooks = genreSelected
    ? books.filter((b) => b.genres.includes(genreSelected))
    : books

  const handleGenreChange = (genre) => {
    setGenreSelected(genre)
  }

  return (
    <div>
      <h2>books</h2>

      {!genreSelected ? (
        <p>all genre books</p>
      ) : (
        <p>
          in genre <strong>{genreSelected}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((g) => (
        <button key={g} onClick={() => handleGenreChange(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => handleGenreChange(null)}>all genres</button>
    </div>
  )
  // const [genreSelected, setGenreSelected] = useState(null)

  // const { loading: loadingGenres, data: genresData } = useQuery(ALL_BOOKS)

  // const { loading: loadingBooks, data: booksData } = useQuery(BOOKS_BY_GENRE, {
  //   variables: { genreToSearchBy: genreSelected },
  // })

  // if (!props.show) {
  //   return null
  // }

  // if (loadingBooks || loadingGenres) return <div>loading...</div>

  // const books = booksData.allBooks
  // const allGenres = [...new Set(genresData.allBooks.flatMap((b) => b.genres))]

  // const handleGenreChange = (genre) => {
  //   setGenreSelected(genre)
  // }

  // return (
  //   <div>
  //     <h2>books</h2>

  //     {!genreSelected ? (
  //       <p>all genre books</p>
  //     ) : (
  //       <p>
  //         in genre <strong>{genreSelected}</strong>
  //       </p>
  //     )}

  //     <table>
  //       <tbody>
  //         <tr>
  //           <th></th>
  //           <th>author</th>
  //           <th>published</th>
  //         </tr>
  //         {books.map((b) => (
  //           <tr key={b.title}>
  //             <td>{b.title}</td>
  //             <td>{b.author.name}</td>
  //             <td>{b.published}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>

  //     {allGenres.map((g) => (
  //       <button key={g} onClick={() => handleGenreChange(g)}>
  //         {g}
  //       </button>
  //     ))}
  //     <button onClick={() => handleGenreChange(null)}>all genres</button>
  //   </div>
  // )
}

export default Books
