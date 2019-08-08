const { buildSchema } = require('graphql');


var schema = buildSchema(`

  type Query {
    course(id: ID!): Author
    courses(title: String): [Course]
  }

  type Course {
    id: ID!
    title: String
    author: String
    description: String
    topic: String
    url: String
  }

  type Mutation {
  }

`);

module.exports = schema;