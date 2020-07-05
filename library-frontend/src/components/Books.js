import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, USER } from '../queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all')

  const result = useQuery(ALL_BOOKS)
  const user = useQuery(USER)


  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const favGenre = user.data.me !== null ? user.data.me.favoriteGenre : null

  const books = result.data.allBooks

  const genres = books.reduce((acc, book) => acc.concat(book.genres), [])
  // const uniqueGenres = [...new Set(genres)] 
  const uniqueGenres = genres.filter((val, idx, arr) => arr.indexOf(val) === idx)

  var booksToDisplay
  if (props.page === 'recommendation') {
    booksToDisplay = books.filter(book => book.genres.includes(favGenre))
  }
  else {
    booksToDisplay = genreFilter === 'all'
      ? books
      : books.filter(book => book.genres.includes(genreFilter))
  }

  return (
    <div>
      <h2>books</h2>
      {props.page === 'recommendation' &&
        <h3>Books in your favorite genre
        <span style={{ color: 'blue' }}> {favGenre}</span>
        </h3>
      }
      {(genreFilter !== 'all' && props.page !== 'recommendation') &&
        <h3>in genre
        <span style={{ color: 'blue' }}> {genreFilter}</span>
        </h3>
      }
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToDisplay.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.page !== 'recommendation' &&
        <div>
          {uniqueGenres.map(genre =>
            <button onClick={() => setGenreFilter(genre)}>
              {genre}
            </button>
          )}
          <button onClick={() => setGenreFilter('all')}>
            all genres
        </button>
        </div>
      }
    </div>

  )
}

export default Books