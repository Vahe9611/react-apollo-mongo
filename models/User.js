const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
  email: { type: String, required: true },
  name: { type: String, required: true },
  // @TODO timestamp for order
});

module.exports = mongoose.model('User', User)