import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN, USER } from '../queries'

const LoginForm = ({ setToken, show, setPage }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)



  useEffect(() => {
    if (result.data) {
      console.log(result.data)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      // const favGenre = result.data.login.favGenre
      // localStorage.setItem('favGenre', favGenre)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
    setPage('authors')
  }

  return (
    <div onSubmit={submit}>
      <form>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm