import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR_BIRTHYEAR } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const BirthYearForm = ({ authors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [year, setYear] = useState('')

  const [updateAuthorBirthYear] = useMutation(EDIT_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!selectedOption) return

    updateAuthorBirthYear({
      variables: {
        name: selectedOption.value,
        setBornTo: parseInt(year),
      },
    })

    setSelectedOption(null)
    setYear('')
  }

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="Select author"
          />
        </div>
        <div>
          year
          <input
            value={year}
            type="number"
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BirthYearForm authors={authors} />
    </div>
  )
}

export default Authors
