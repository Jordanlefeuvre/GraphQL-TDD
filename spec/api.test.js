import app  from '../src/app'
import request from 'supertest'
import fakeDatabase from '../src/FakeDatabase'

describe('GET /', () => {
  let response
  test('verify send one post has authors', async () =>{
    const query_string = `{
      posts{
        title,
        author {
          name  
        }
      }
    }`
    
    response  = await  request(app)
      .post('/graphql')
      .send({ query:  query_string})
    expect(response.body.data.posts[0].title).toBe("My first blog post")
    })

    test('verify send many posts has authors', async () =>{
      const query_string = `{
        posts{
          title,
          content,
          id,
          author {
            id
          }
        }
      }`
      
      response  = await  request(app)
        .post('/graphql')
        .send({ query:  query_string})
      expect(response.body.data.posts).toStrictEqual([{
            id: 1,
            title: 'My first blog post',
            content: 'This is my very first blog post. Hope you like it!',
            author: {id: '88d6bec2'},
        },
        {
            id: 2,
            title: 'Second blog post',
            content: 'Back for another round!',
            author: {id: '0beb564c'},
        },
        {
            id: 3,
            title: 'Building a REST API',
            content: 'A pratical guide on how to build your own REST API.',
            author: {id: '77e2448a'},
        }])
    })

      test('verify sendauthors', async () =>{
        const query_string = `{
          posts{
            id,
            title,
            content
          }
        }`
        
        response  = await  request(app)
          .post('/graphql')
          .send({ query:  query_string})
        expect(response.body.data.posts[0]).toStrictEqual({
          id: 1,
          title: 'My first blog post',
          content: 'This is my very first blog post. Hope you like it!'
        })
      })

    test('It should respond with a 200 status code', async () => {
      expect(response.statusCode).toBe(200);
    });
});
// author {
//   name  
// }