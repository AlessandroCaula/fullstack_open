import { expect } from "chai";
import Blog from "./Blog";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"

test('Renders only Title and Author content', () => {
  const blog = {
    title: "Blog Test",
    author: "Author Test",
    url: "Url Test",
    likes: 3
  }

  const { container } = render(<Blog blog={blog} />)
  screen.debug(container)

  // Finding element with CSS-selectors
  const divAuthorTitle = container.querySelector('.blog') // blog-author-title
  // screen.debug(divAuthorTitle)

  // Check that the blog Title is rendered
  expect(divAuthorTitle).toHaveTextContent('Blog Test')
  // Check that the blog Author is rendered
  expect(divAuthorTitle).toHaveTextContent('Author Tes')

  // Check that the Url is not rendered
  expect(divAuthorTitle).not.toHaveTextContent('Url Test')
  // Check that the number of Likes is not rendered
  expect(divAuthorTitle).not.toHaveTextContent('likes')
})

test('Clicking the details button show Url and Title', async () => {
  const blog = {
    title: "Blog Test",
    author: "Author Test",
    url: "Url Test",
    likes: 3
  }

  const { container } = render(<Blog blog={blog} />)
  screen.debug(container)
  
  // Start a session to interact with the rendered component
  const user = userEvent.setup()
  // const buttonDetails = screen.getByText('View details')
  const buttonDetails = container.querySelector('.blog-button')
  // screen.debug(buttonDetails)
  // Click the button
  await user.click(buttonDetails)
  screen.debug(container)
})