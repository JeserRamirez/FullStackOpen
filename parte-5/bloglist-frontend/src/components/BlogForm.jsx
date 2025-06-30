import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })


    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write title here'
            data-testid='title'
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write author here'
            data-testid='author'
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write url here'
            data-testid='url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm