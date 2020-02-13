// import schema from './schema';
import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { fakeDatabase }  from './FakeDatabase';
import { GraphQLList } from "graphql/type";

const app = express();

app.use(cors());

const AuthorType = new GraphQLObjectType( {
  name : "author",
  fields : () => ({
    id: {type: GraphQLString},
    name: {type:GraphQLString},
    email: {type:GraphQLString},
  })
})

const postType = new GraphQLObjectType( {
  name : "posts",
  fields : () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve : (parent,args) => fakeDatabase.getAuthor(parent.author)
    },
  })
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      posts : {
        type: new GraphQLList(postType),
        resolve:()=> {
          return fakeDatabase.getBlogPosts()
        }
      }
    })
  })
});


// var schema = new GraphQLObjectType({
//   name: 'posts',
//   fields: () => ({
//     title: {type: GraphQLString }
//   })
// });

// var root = {
//   posts: ({}) => {
//     return fakeDatabase.getBlogPosts();
//   }
// };

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
// app.use('/graphql', bodyparser.json(), graphqlExpress({ schema: graphQLSchema }))

export default app;