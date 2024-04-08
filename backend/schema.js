// Owen Beattie Assignment 1 COMP3133 101379668

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeById(id: ID!): Employee
    login(usernameOrEmail: String!, password: String!): User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = typeDefs;