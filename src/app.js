// import schema from './schema';
import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { fakeDatabase }  from './FakeDatabase';
import { GraphQLList } from "graphql/type";
// import { mongoose } from 'mongoose';

const app = express();
const mongoose = require('mongoose');

app.use(cors());

beforeAll(async () => {

  await mongoose.connect(`mongodb+srv://root:root@cluster0-tnzko.mongodb.net/GraphQLTDD?retryWrites=true&w=majority`, {useNewUrlParser: true});

  const AuthorSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String
  });
  const PostsSchema = new mongoose.Schema({
    _id: String,
    title: String,
    content: String,
    nested: [AuthorSchema],
  });

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
       // resolve : (parent,args, context, info) => { AuthorSchema.findbyId(args.id).exec();
        resolve : (parent,args, context, info) => { fakeDatabase.getAuthor()
      }},
    })
  })

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        posts : {
          type: new GraphQLList(postType),
          resolve:(parent, args, context, info)=> {
            return fakeDatabase.getBlogPosts();
            // return PostsSchema.find().exec();
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

})

export default app;