
// import .env variables
require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  jwt:{
    secret:process.env.JWT_SECRET
  },
  mailgun:{
    domain:process.env.MAILGUN_DOMAIN,
    apiKey:process.env.MAILGUN_API_KEY
  }
};
