const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Empty the database
    await request.post('http://localhost:3003/api/testing/reset')
    // Create a user 
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "acaula",
        name: "Alessandro Caula",
        password: "provaprova"
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Get the login form using the data-testid defined in the login form in the frontend
    const loginFormLocator = await page.getByTestId('login form')
    await expect(loginFormLocator).toBeVisible()
    // Check the existence of the Username text for the bloglist login form 
    const usernameLocator = await page.getByText('Username')
    await expect(usernameLocator).toBeVisible()
    // Check the existence of the Password text for the bloglist login form
    const passwordLocator = await page.getByText('Password')
    await expect(passwordLocator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Logging in 
      await page.getByTestId('username').fill('acaula')
      await page.getByTestId('password').fill('provaprova')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Alessandro Caula logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('acaula')
      await page.getByTestId('password').fill('error')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDivLocator = await page.getByTestId('errorDiv')
      await expect(errorDivLocator).toContainText('Wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('acaula')
      await page.getByTestId('password').fill('provaprova')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'New blog by playwright', 'Playwright', 'Blog URL')
      await expect(page.getByText('New blog by playwright Playwright')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      // Create a new blog
      await createBlog(page, 'New blog by playwright', 'Playwright', 'Blog URL')

      // Open the blog so that the likes count can be increased
      await page.getByRole('button', { name: 'View details' }).click()
      // Number of likes when a blog is created is 0
      await expect(page.getByText('likes 0')).toBeVisible()
      // Like the blog 
      await page.getByRole('button', { name: 'Like' }).click()
      // Check the the number of likes is now 1
      await expect(page.getByText('likes 1')).toBeVisible()

      // -- Using anther approach, independent from the initial number of likes
      // Retrieve the likes text
      const likesText = await page.getByTestId("blog-likes").textContent()
      // Retrieve the number of likes "n"
      const n = parseInt(likesText.replace('likes', ''), 10)
      // Increase the number of likes by clicking the "Like" button
      await page.getByRole('button', { name: 'Like' }).click()
      // Check the the number of likes is now n + 1
      await expect(page.getByText(`likes ${n + 1}`)).toBeVisible()
    })

    test('a blog can be deleted by the logged in user', async ({ page }) => {
      // Create a new blog
      await createBlog(page, 'New blog by playwright', 'Playwright', 'Blog URL')

      // Open the blog so that the blog can be also deleted
      await page.getByRole('button', { name: 'View details' }).click()      
      
      // Accept the confirmation dialog window when deleting the blog
      page.on('dialog', async dialog => {
        await dialog.accept()
      })
      // Click the delete button
      await page.getByRole('button', { name: 'Delete' }).click()
      // Check that the blog is not visible anymore
      await expect(page.getByText('New blog by playwright Playwright')).not.toBeVisible()
    })
  })
})