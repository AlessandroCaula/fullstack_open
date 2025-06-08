const createBlog = async (page, blogTitle, blogAuthor, blogUrl) => {
  await page.getByRole('button', { name: 'Create New Blog' }).click()

  await page.getByPlaceholder('Blog Title').fill('New blog by playwright')
  await page.getByPlaceholder('Blog Author').fill('Playwright')
  await page.getByPlaceholder('Blog URL').fill('Blog URL')

  await page.getByRole('button', { name: 'Create' }).click()
}

export { createBlog }