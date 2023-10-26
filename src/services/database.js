// const mysql = require('mysql2/promise')
const { Client } = require('pg')
module.exports = async () => {



  try {
    const client = new Client({
      user: 'postgres',
      host: '127.0.0.1',
      database: 'lojaonline',
      password: '123456',
      port: 5432
    })
    await client.connect()

    console.log("connection database successfuly!")
    return client;
  } catch (err) {
    return Promise.reject(err)
  }
}

