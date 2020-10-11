const { merge } = require('lodash');

const user = require('./user');

module.exports = {
  typeDefs: [user.typeDefs],
  resolvers: merge(user.resolvers),
};

