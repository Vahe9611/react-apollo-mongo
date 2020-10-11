module.exports = async (app) => {
  const mongoose = require('mongoose');
  
  try {
    const MONGO_URI_LOCAL = "mongodb://localhost:27017/apollo-test"
    
    const mongoUri = process.env.MONGO_URI || MONGO_URI_LOCAL;
    
    await mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.log(error);
  }
}