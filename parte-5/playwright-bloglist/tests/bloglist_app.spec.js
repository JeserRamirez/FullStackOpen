const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, logout, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Bloglist testUser',
        username: 'testUser',
        password: 'testuser',
      },
    })
    await request.post('/api/users', {
      data: {
        name: 'Bloglist testUser2',
        username: 'testUser2',
        password: 'testuser2',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()

    await expect(page.locator('form')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'testuser')

      await expect(page.getByText('Bloglist testUser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'test')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(
        page.getByText('Bloglist testUser logged in')
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testUser', 'testuser')
      await createBlog(page, 'Test Blog', 'Test Blog author', 'Test Blog url')
      await expect(page.getByText('Test Blog Test Blog autho')).toBeVisible()
      await logout(page)

      await loginWith(page, 'testUser2', 'testuser2')
      await createBlog(
        page,
        'Test Blog2',
        'Test Blog author2',
        'Test Blog url2'
      )

      await expect(page.getByText('Test Blog2 Test Blog author2')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'Test Blog1',
        'Test Blog author1',
        'Test Blog url1'
      )

      await expect(page.getByText('Test Blog1 Test Blog author1')).toBeVisible()
    })

    test('a blog can be edited', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByPlaceholder('title').fill('Test Blog2')
      await page.getByPlaceholder('author').fill('Updated Author')
      await page.getByPlaceholder('url').fill('Updated URL')

      page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('already exists')
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'create' }).click()

      await expect(
        page.getByText('Test Blog2 Test Blog author2')
      ).not.toBeVisible()
      await expect(page.getByText('Test Blog2 Updated Author')).toBeVisible()
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      const viewButtons = await page.getByRole('button', { name: 'view' }).all()
      await viewButtons[1].click()

      page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Remove blog')
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'remove' }).click()

      await expect(
        page.getByText('Test Blog2 Test Blog author2')
      ).not.toBeVisible()
    })

    test('a blog can only show the delete button to its creator', async ({
      page,
    }) => {
      const blogs = page.locator('.blog')
      await blogs.nth(0).getByRole('button', { name: 'view' }).click()
      await expect(
        blogs.nth(0).getByRole('button', { name: 'remove' })
      ).not.toBeVisible()

      await blogs.nth(1).getByRole('button', { name: 'view' }).click()
      await expect(
        blogs.nth(1).getByRole('button', { name: 'remove' })
      ).toBeVisible()
    })

    describe('and multiple blogs created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'Test Blog3',
          'Test Blog author3',
          'Test Blog url3'
        )
        await expect(
          page.getByText('Test Blog3 Test Blog author3')
        ).toBeVisible()

        await createBlog(
          page,
          'Test Blog4',
          'Test Blog author4',
          'Test Blog url4'
        )
        await expect(
          page.getByText('Test Blog4 Test Blog author4')
        ).toBeVisible()

        await createBlog(
          page,
          'Test Blog5',
          'Test Blog author5',
          'Test Blog url5'
        )
        await expect(
          page.getByText('Test Blog5 Test Blog author5')
        ).toBeVisible()
      })

      test('blogs are sorted by likes from higher to lower', async ({
        page,
      }) => {
        const blogs = page.locator('.blog')

        const count = await blogs.count()
        expect(count).toBeGreaterThanOrEqual(5)

        await blogs.nth(4).getByRole('button', { name: 'view' }).click()

        await blogs.nth(4).getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(300)
        await blogs.nth(0).getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(300)
        await blogs.nth(0).getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(300)

        const firstBlogText = await blogs.nth(0).innerText()
        expect(firstBlogText).toContain('Test Blog5')
      })
    })
  })
})
