import '@testing-library/jest-dom'

import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

import { Blog, BlogForm } from '../components/Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
const mock = new MockAdapter(axios)
mock.onPut('/api/blogs/6596a682103d849b08445e87').reply(200, { 'result': 'Update success' })
mock.onPost('/api/blogs').reply(200, { 'result': 'Post success' })
mock.onGet('/api/blogs').reply(200, [{ 'title': 'Post1', 'author': 'xie', 'user': { 'username': 'hashery', 'blog': [], 'id': '65959c90ae29f3ccbffbd8d9' }, 'url': 'url', 'likes': 8, 'id': '6596a682103d849b08445e87' }, { 'title': 'test blog', 'author': 'tester', 'user': { 'username': 'hashery', 'blog': [], 'id': '65959c90ae29f3ccbffbd8d9' }, 'url': 'http://www.test.com', 'likes': 0, 'id': '6597c6e05213f421c6a6dc99' }])

// 5.13 displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.
test('default renders content', () => {
  const user = {
    'username': 'hashery',
    'password': 'onetwo',
    'id': '65959c90ae29f3ccbffbd8d9'
  }

  // console.log('>>> login success')
  const blog = {
    'title': 'Post1',
    'author': 'xie',
    'user': { 'username': 'hashery', 'blog': [], 'id': '65959c90ae29f3ccbffbd8d9' },
    'url': 'url',
    'likes': 8,
    'id': '6596a682103d849b08445e87'
  }

  render(<Blog user={user} blog={blog} updateBlogs={() => { }} />)

  expect(screen.getByText(`title : ${blog.title}`)).toBeDefined()
  expect(screen.getByText(`author : ${blog.author}`)).toBeDefined()
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(blog.likes.toString())).toBeNull()
})

// 5.14 checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.

test('After click button, renders content', () => {
  const user = {
    'username': 'hashery',
    'password': 'onetwo',
    'id': '65959c90ae29f3ccbffbd8d9'
  }

  // console.log('>>> login success')
  const blog = {
    'title': 'Post1',
    'author': 'xie',
    'user': { 'username': 'hashery', 'blog': [], 'id': '65959c90ae29f3ccbffbd8d9' },
    'url': 'url',
    'likes': 8,
    'id': '6596a682103d849b08445e87'
  }

  const updateBlogsMock = jest.fn()
  const { container } = render(<Blog user={user} blog={blog} updateBlogs={() => { }} />)
  const toggleButton = screen.getByText('view')
  fireEvent.click(toggleButton)

  expect(screen.getByText(`title : ${blog.title}`)).toBeDefined()
  expect(screen.getByText(`author : ${blog.author}`)).toBeDefined()
  expect(screen.getByText(`url : ${blog.url}`)).toBeDefined()
  expect(screen.getByText(`likes : ${blog.likes}`)).toBeDefined()
})

// 5.15 Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.
test('Click like button twice', async () => {
  const user = {
    'username': 'hashery',
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhhc2hlcnkiLCJpZCI6IjY1OTU5YzkwYWUyOWYzY2NiZmZiZDhkOSIsImlhdCI6MTcwNDQ0NzE3MH0.94oDJNrP3gIcjNufxBsl_7BjRYepq2kSuw2D2EmdyFQ',
    'id': '65959c90ae29f3ccbffbd8d9'
  }

  // console.log('>>> login success')
  const blog = {
    'title': 'Post1',
    'author': 'xie',
    'user': { 'username': 'hashery', 'blog': [], 'id': '65959c90ae29f3ccbffbd8d9' },
    'url': 'url',
    'likes': 8,
    'id': '6596a682103d849b08445e87'
  }

  const updateBlogsMock = jest.fn()
  await blogService.setToken(user.token)
  render(<Blog user={user} blog={blog} updateBlogs={updateBlogsMock} />)
  const toggleButton = screen.getByText('view')
  const testuser = userEvent.setup()
  await testuser.click(toggleButton)

  const likeButton = screen.getByRole('button', { name: 'like' })

  await testuser.click(likeButton)
  await testuser.click(likeButton)

  expect(updateBlogsMock.mock.calls).toHaveLength(2)
})


// 5.16 Render the BlogForm with the mock function as a prop

test('creating new blogs', async () => {
  const user = {
    'username': 'hashery',
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhhc2hlcnkiLCJpZCI6IjY1OTU5YzkwYWUyOWYzY2NiZmZiZDhkOSIsImlhdCI6MTcwNDQ0NzE3MH0.94oDJNrP3gIcjNufxBsl_7BjRYepq2kSuw2D2EmdyFQ',
    'id': '65959c90ae29f3ccbffbd8d9'
  }

  const handleNewBlogMock = jest.fn()
  const testuser = userEvent.setup()
  render(<BlogForm user={user} handleNewBlog={handleNewBlogMock} />)

  const toggleButton = screen.getByText('New Blog')
  await testuser.click(toggleButton)

  await testuser.type(screen.getByRole('textbox', { name: 'title' }), 'Test Title')
  await testuser.type(screen.getByRole('textbox', { name: 'author' }), 'Test Author')
  await testuser.type(screen.getByRole('textbox', { name: 'url' }), 'http://test.com')

  await testuser.click(screen.getByText('create'))

  // Check that the createBlog function was called with the correct details
  expect(handleNewBlogMock.mock.calls).toHaveLength(1)
  expect(handleNewBlogMock).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com',
  })
})