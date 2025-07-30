import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE, ME } from '../queries'

const Recommend = ({ show }) => {
  // const meResult = useQuery(ME)
  // const allBooksResult = useQuery(ALL_BOOKS)

  // if (!show) {
  //   return null
  // }

  // const books = allBooksResult.data.allBooks
  // const favoriteGenre = meResult.data.me.favoriteGenre
  // const filteredBooks =
  //   favoriteGenre && books.filter((b) => b.genres.includes(favoriteGenre))

  // return (
  //   <div>
  //     <h2>recommendations</h2>

  //     <p>
  //       books in your favorite genre <strong>{favoriteGenre}</strong>
  //     </p>

  //     <table>
  //       <tbody>
  //         <tr>
  //           <th></th>
  //           <th>author</th>
  //           <th>published</th>
  //         </tr>
  //         {filteredBooks.map((b) => (
  //           <tr key={b.title}>
  //             <td>{b.title}</td>
  //             <td>{b.author.name}</td>
  //             <td>{b.published}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // )
  const meResult = useQuery(ME)

  const favoriteGenre = meResult?.data?.me?.favoriteGenre

  const booksResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genreToSearchBy: favoriteGenre },
  })

  if (!show) {
    return null
  }

  if (meResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if (!meResult.data || !booksResult.data) {
    return <div>No data available</div>
  }

  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
