const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blogTitle, blogAuthor, blogUrl) => {
  await page.getByRole('button', { name: 'Create New Blog' }).click()

  await page.getByPlaceholder('Blog Title').fill(blogTitle)
  await page.getByPlaceholder('Blog Author').fill(blogAuthor)
  await page.getByPlaceholder('Blog URL').fill(blogUrl)

  await page.getByRole('button', { name: 'Create' }).click()
}

export { loginWith, createBlog }