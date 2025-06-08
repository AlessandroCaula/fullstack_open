const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
    // Create a second user
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "bcaula",
        name: "Bruno Caula",
        password: "testest"
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
      await loginWith(page, 'acaula', 'provaprova')
      await expect(page.getByText('Alessandro Caula logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'acaula', 'error')

      const errorDivLocator = await page.getByTestId('errorDiv')
      await expect(errorDivLocator).toContainText('Wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'acaula', 'provaprova')
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

  test('only user who added the blog can see them', async ({ page }) => {
    // Login with acaula
    await loginWith(page, 'acaula', 'provaprova')
    // Check correct logging in 
    await expect(page.getByText('Alessandro Caula logged in')).toBeVisible()
    // Add new blog with acaula
    await createBlog(page, 'New blog by ACaula', 'ACaula', 'Blog URL')
    // Check new blog
    await expect(page.getByText('New blog by ACaula ACaula')).toBeVisible()

    // Logout from this user 
    await page.getByRole('button', { name: 'Log out' }).click()

    // Check no user is logged
    await expect(page.getByText('Alessandro Caula logged in')).not.toBeVisible()
    // Log in with another user
    await loginWith(page, 'bcaula', 'testest')
    // Check correct logging in 
    await expect(page.getByText('Bruno Caula logged in')).toBeVisible()
    // Check that this new logged in user doesn't see the blog added from the other user
    await expect(page.getByText('New blog by ACaula ACaula')).not.toBeVisible()
  })

  test.only('the blogs are sorted accordingly to their number of likes', async ({ page }) => {
    // Login
    await loginWith(page, 'acaula', 'provaprova')
    // -- Create new blogs
    const first_blog_title = "Blog 1"
    const first_blog_author = "Author 1"
    await createBlog(page, first_blog_title, first_blog_author, 'url')
    const second_blog_title = "Blog 2"
    const second_blog_author = "Author 2"
    await createBlog(page, second_blog_title, second_blog_author, 'url')
    const third_blog_title = "Blog 3"
    const third_blog_author = "Author 3"
    await createBlog(page, third_blog_title, third_blog_author, 'url')

    // Now increase the number of likes of the third blog
    const third_blog = await page.getByText(`${third_blog_title} ${third_blog_author}`)
    // const third_blog_details = 
    await third_blog.getByRole('button', { name: 'View details' }).click() 
    // Retrieve the likes text
    const likesText = await page.getByTestId("blog-likes").textContent()
    // Retrieve the number of likes "n"
    const n = parseInt(likesText.replace('likes', ''), 10)
    await page.getByRole('button', { name: 'Like' }).click()
    await page.getByText(`likes ${n + 1}`).waitFor()
    await page.getByRole('button', { name: 'Like' }).click()
    await page.getByText(`likes ${n + 2}`).waitFor()
    // Hide the Details now
    await page.getByRole('button', { name: 'Hide' }).click()

    // Retrieve all blog elements in the order they appear
    const blogElements = await page.locator('.blog').all();
    console.log(blogElements)

  })
})