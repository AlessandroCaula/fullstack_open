import BlogForm from "./BlogForm"
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { expect, test, vi } from 'vitest'

test('blog is added correctly', async () => {
  const mockCreateBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={mockCreateBlog} />)

  // Set the input files of the Blog form
  const titleInput = screen.getByPlaceholderText('Blog title')
  const authorInput = screen.getByPlaceholderText('Blog author')
  const urlInput = screen.getByPlaceholderText('Blog URL')
  // Retrieve the create (save) button
  const createButton = screen.getByText('Create')

  // Add the input in the form
  await user.type(titleInput, 'Test Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'Test URL')
  // Click the create button
  await user.click(createButton)

  // Check what is send to the mockCreateBlog
  const createdBlog = mockCreateBlog.mock.calls[0][0]
  expect(createdBlog.title, 'Blog title')
  expect(createdBlog.author, 'Blog author')
  expect(createdBlog.url, 'Blog URL')
})