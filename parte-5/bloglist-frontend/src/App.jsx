import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusCode, setStatusCode] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      const findBlog = blogs.find(blog =>
        blog.title.toLowerCase().trim() === blogObject.title.toLowerCase().trim()
      )

      if (findBlog) {
        if (user.id === findBlog.user.id) {
          const confirmUpdate = window.confirm(
            `The blog "${blogObject.title}" already exists. Do you want to update it?`
          )

          if (confirmUpdate) {
            const updatedBlog = await blogService.update(findBlog.id, blogObject)
            setBlogs(blogs.map(blog =>
              blog.id !== updatedBlog.id ? blog : updatedBlog
            ))

            setErrorMessage(`The blog "${blogObject.title}" has been updated successfully`)
            setStatusCode(201)
            setTimeout(() => {
              setErrorMessage(null)
              setStatusCode(null)
            }, 5000)
          }

          return // detener ejecución si se actualizó o se canceló
        } else {
          setErrorMessage(`${blogObject.title} already exists and you do not have permission to update it`)
          setStatusCode(403)
          setTimeout(() => {
            setErrorMessage(null)
            setStatusCode(null)
          }, 5000)
          return
        }
      }

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setErrorMessage(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} was added`)
      setStatusCode(201)
      setTimeout(() => {
        setErrorMessage(null)
        setStatusCode(null)
      }, 5000)

    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred')
      setStatusCode(error.response?.status || 500)
      setTimeout(() => {
        setErrorMessage(null)
        setStatusCode(null)
      }, 5000)
    }
  }


  const updateLikes = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setStatusCode(error.response.status)
      setTimeout(() => {
        setErrorMessage(null)
        setStatusCode(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setErrorMessage(`blog ${blog.title} by ${blog.author} deleted`)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch(error) {
        setErrorMessage(error.response.data.error)
        setStatusCode(error.response.status)
        setTimeout(() => {
          setErrorMessage(null)
          setStatusCode(null)
        }, 5000)
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setStatusCode(error.response.status)
      setTimeout(() => {
        setErrorMessage(null)
        setStatusCode(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <>
        <h1>log in to application</h1>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>

        <Notification message={errorMessage} statusCode={statusCode} />
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={ (event) => setUsername(event.target.value) }
            handlePasswordChange={ (event) => setPassword(event.target.value) }
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </>
    )
  }

  return (
    <div>
      {!user && loginForm()}

      {user && <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} statusCode={statusCode} />
        <p>
          {user.name} logged in <button onClick={() => {
            window.localStorage.removeItem('loggedBlogAppUser')
            setUser(null)
          }}>logout</button>
        </p>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} loggedUser={user}/>
        </Togglable>

        {
          [...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} loggedUser={user} />
            ))
        }
      </div>
      }
    </div>
  )
}

export default App