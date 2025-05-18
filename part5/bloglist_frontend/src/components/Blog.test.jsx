import { expect } from "chai";
import Blog from "./Blog";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"

// Testing that 
test('Renders only Title and Author content', () => {
  const blog = {
    title: "Blog Test",
    author: "Author Test",
    url: "Url Test",
    likes: 3
  }

  const { container } = render(<Blog blog={blog} />)
  // screen.debug(container)

  // Finding element with CSS-selectors
  const divBlog = container.querySelector('.blog') // blog-author-title
  // screen.debug(divAuthorTitle)

  // Check that the blog Title is rendered
  expect(divBlog).toHaveTextContent('Blog Test')
  // Check that the blog Author is rendered
  expect(divBlog).toHaveTextContent('Author Tes')

  // Check that the Url is not rendered
  expect(divBlog).not.toHaveTextContent('Url Test')
  // Check that the number of Likes is not rendered
  expect(divBlog).not.toHaveTextContent('likes')
})

test('Clicking the details button show Url and Title', async () => {
  const blog = {
    title: "Blog Test",
    author: "Author Test",
    url: "Url Test",
    likes: 3,
    user: {
      name: "Alessandro Caula"
    }
  }

  const { container } = render(<Blog blog={blog} />)
  
  // Start a session to interact with the rendered component
  const user = userEvent.setup()
  // Get the button 
  const buttonDetails = screen.getByText('View details')
  // Click the button
  await user.click(buttonDetails)
  
  // Now check if the Url and Title information are rendered
  const divDetails = container.querySelector('.blog-url-likes')
  // screen.debug(divDetails)
  expect(divDetails).toHaveTextContent('Url Test')
  expect(divDetails).toHaveTextContent('likes')
})

test('Button clicked twice, gives to clicks', async () => {
  const blog = {
    title: "Blog Test",
    author: "Author Test",
    url: "Url Test",
    likes: 3,
    user: {
      name: "Alessandro Caula"
    }
  }

  // Event handler mock for updating the number of likes
  const mockBlogLikesUpdate = vi.fn()
  const { container } = render(<Blog blog={blog} blogLikesUpdate={mockBlogLikesUpdate}/>)

  // Start a session to interact with the rendered component
  const user = userEvent.setup()
  // Get the view details button and click it
  const buttonDetails = screen.getByText('View details')
  await user.click(buttonDetails)

  // Now retrieve the likes button and click it twice
  const likesButton = screen.getByText('Like')
  // screen.debug(likesButton)
  // Click it twice
  await user.click(likesButton)
  await user.click(likesButton)
  expect(mockBlogLikesUpdate.mock.calls).toHaveLength(2)
})