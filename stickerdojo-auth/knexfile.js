require('dotenv').config({path:"../.env"})

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_DEVELOPMENT
  }

}