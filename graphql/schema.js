const { buildSchema } = require('graphql');


var schema = buildSchema(`

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
  }

  type Course {
    id: Int!
    title: String
    author: String
    description: String
    topic: String
    url: String
  }

`);

module.exports = schema;