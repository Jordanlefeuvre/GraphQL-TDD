import { buildSchema } from 'graphql';

// export const schema = buildSchema(`
// type posts  {
//     title: String
// }

// type Query {
//     posts(title: String): posts
// }
// `);

export const schema = buildSchema(`
type Query {
    posts(title: String): String
}
`);