import mysql from 'mysql'
import dbConfig from '../configs/db.config.js'

const Connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
})

export default Connection

Connection.getConnection((err) => {
    if (err) {
        console.log('Error connecting to mysql : ', err)
    } else {
        console.log('Connected to Mysql Successfull')
    }
})