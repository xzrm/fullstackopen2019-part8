import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_BIRTHDAY } from '../queries'

const BirthdayForm = ({ authors }) => {
  const [author, setAuthor] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [changeBirthday] = useMutation(EDIT_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()
    changeBirthday({ variables: { name: author, setBornTo: parseInt(born) } })
    setBorn('')
  }

  const handleChange = (event) => {
    setAuthor(event.target.value)
  }

  return (
    <div>
      <h3>set birthday</h3>
      <form onSubmit={submit}>
        <select value={author} onChange={handleChange}>
          {authors.map(author =>
            <option key={author.name} value={author.name} >
              {author.name}
            </option>
          )}
        </select>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthdayForm
