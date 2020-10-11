
const { Kind, GraphQLScalarType, GraphQLError } = require('graphql');
const { UserInputError } = require('apollo-server-express');

const validate = (value) => {
  const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (typeof value !== 'string') {
    return {
      error: true,
      ErrorType: UserInputError,
      message: 'Value is not a string'
    }
  }

  if (!EMAIL_ADDRESS_REGEX.test(value)) {
    return {
      error: true,
      ErrorType: UserInputError,
      message: 'Value is not a valid email address'
    }
  }

  return value;
};

module.exports = new GraphQLScalarType({
  name: 'Email',

  description: 'Email scalar',

  serialize: validate,

  parseValue: validate,

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      return {
        error: true,
        ErrorType: GraphQLError,
        message: `Can only validate strings as email addresses but got a: ${ast.kind}`
      }
    }

    return validate(ast.value);
  },
});
