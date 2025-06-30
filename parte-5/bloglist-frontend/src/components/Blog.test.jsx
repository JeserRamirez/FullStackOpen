import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component tests', () => {
  let container
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 5,
      user: {
        name: 'Test User',
        username: 'testuser'
      }
    }

    mockHandler = vi.fn()

    container = render(<Blog blog={blog} updateLikes={mockHandler}/>).container
  })

  test('the Blog component should only show the title and author', () => {
    const element = container.querySelector('.blog')

    expect(element).toHaveTextContent('Test Blog')
    expect(element).toHaveTextContent('Test Author')
    expect(element).not.toHaveTextContent('http://testblog.com')
    expect(element).not.toHaveTextContent('5 likes')
  })

  test('the Blog component should show the url and likes when the view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = container.querySelector('.blog')

    expect(element).toHaveTextContent('http://testblog.com')
    expect(element).toHaveTextContent('5 likes')
  })

  test('the Blog component should call the updateLikes function when the like button is clicked', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

