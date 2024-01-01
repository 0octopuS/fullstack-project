const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// 4.8 blog returns as json
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// 4.9 unique identifier property of the blog posts is named id
test('blog has property id but not _id', async () => {
    const newBlog = {
        title: 'BlogByXie',
        author: 'Xie',
        url: 'http://xie.com/blog1',
        likes: 5,
    };

    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(201);
    const createdBlog = response.body;
    expect(createdBlog.id).toBeDefined();
    expect(createdBlog._id).toBeUndefined();
});

// 4.10 Post to successfully creates a new blog post
test('blog is successfully stored', async () => {
    const newBlog = {
        title: 'BlogByXie',
        author: 'Xie',
        url: 'http://xie.com/blog1',
        likes: 5,
    };

    const Blogs = await api.get('/api/blogs');
    const BlogCount = Blogs.body.length;
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(201);
    const BlogsNew = await api.get('/api/blogs');
    BlogCountNew = BlogsNew.body.length;
    expect(BlogCountNew).toBe(BlogCount + 1);

    const createdBlog = response.body;
    const { id, ...blogWithoutId } = createdBlog;
    expect(blogWithoutId).toEqual({
        title: 'BlogByXie',
        author: 'Xie',
        url: 'http://xie.com/blog1',
        likes: 5,
    });
});
// 4.11 if the likes property is missing from the request, it will default to the value 0
test('Missing like value give default 0', async () => {

    const newBlog = {
        title: 'BlogByXie',
        author: 'Xie',
        url: 'http://xie.com/blog1',
    };

    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(201);
    const createdBlog = response.body;
    expect(createdBlog.likes).toBe(0);
});


// 4. 12 if the title or url properties are missing, return 404
test('Missing url/title return 404', async () => {
    const newBlogWithoutTitle = {
        author: 'Xie',
        url: 'http://xie.com/blog1',
        likes: 5,
    };
    const newBlogWithoutUrl = {
        title: 'BlogByXie',
        author: 'Xie',
        likes: 6,
    };

    const response1 = await api.post('/api/blogs').send(newBlogWithoutTitle);
    expect(response1.status).toBe(400);
    const response2 = await api.post('/api/blogs').send(newBlogWithoutUrl);
    expect(response2.status).toBe(400);
});

// 4.13 delete a post
test('Delete a post', async () => {

    const newBlog = {
        title: 'BlogByXie',
        author: 'Xie',
        url: 'http://xie.com/blog1',
    };

    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(201);
    const createdBlog = response.body;
    const createdBlogID = createdBlog.id;

    const deleteResponse = await api.delete(`/api/blogs/${createdBlogID}`);
    expect(deleteResponse.status).toBe(204);

    // it is already be deleted, so it cant be successful the second time
    const deleteNonExistResponse = await api.delete(`/api/blogs/${createdBlogID}`);
    expect(deleteNonExistResponse.status).toBe(404);
});


// 4.14 update a post
test('Update a post', async () => {

    const newBlog = {
        title: 'BlogByXie',
        author: 'Xie',
        url: 'http://xie.com/blog1',
    };

    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(201);
    const createdBlog = response.body;
    const createdBlogID = createdBlog.id;


    const updateBlog = {
        title: 'BlogByZhong',
        author: 'Zhong',
        url: 'http://zhong.com/blog1',
        likes: 100,
    };
    const updateResponse = await api.put(`/api/blogs/${createdBlogID}`).send(updateBlog);
    const { id, ...blogWithoutId } = updateResponse.body;
    expect(blogWithoutId).toStrictEqual({
        title: 'BlogByZhong',
        author: 'Zhong',
        url: 'http://zhong.com/blog1',
        likes: 100,
    });


});

afterAll(async () => {
    await mongoose.connection.close()
})