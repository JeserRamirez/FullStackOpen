import { useState } from 'react'


const Blog = ({ blog, updateLikes, deleteBlog, loggedUser }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const update = (event) => {
    event.preventDefault()
    updateLikes({
      ...blog,
      likes: blog.likes + 1
    })
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button onClick={update}>like</button>
          </p>
          <p>added by {blog.user.name}</p>
          {
            loggedUser.id === blog.user.id &&
            <button onClick={() => deleteBlog(blog)}>remove</button>
          }
        </div>
      )}
    </div>
  )
}

export default Blog