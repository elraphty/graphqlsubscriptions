const { buildSchema } = require('graphql');
const { gql } = require('apollo-server-express');


var schema = gql`

  type Subscription {
    userAdded: String
  }

  input newCourse {
    id: Int!
    title: String
    author: String
    description: String
    topic: String
    url: String
  }

  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  }

  type Mutation {
    addCourse(input: newCourse!): Boolean
    updateCourseTopic(id: Int!, topic: String): Course
    commentAdded(comment: String!): String
  }

  type Course {
    id: Int!
    title: String
    author: String
    description: String
    topic: String
    url: String
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

`;

module.exports = schema;