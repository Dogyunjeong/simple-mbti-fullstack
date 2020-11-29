import mysql2, { QueryOptions } from 'mysql2'
import dbConfig from '../configs/dbConfig'

const mariadbPool = mysql2.createPool({
  host: dbConfig.MARIA_DB_HOST,
  port: parseInt(dbConfig.MARIA_DB_HOST_PORT, 10),
  user: dbConfig.MARIA_DB_USER,
  password: dbConfig.MARIA_DB_SECRET,
  database: dbConfig.MARIA_DB_NAME,
  connectionLimit: 5,
});


mariadbPool.on('acquire', () => {
  console.log('Maria db connected')
})


mariadbPool.on('connection', () => {
  console.log('Mariadb Connection opened')
})

class MariadbConnectionHandler {
  public async query (query: string, values?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      mariadbPool.query(query, values, (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  }
}

export default MariadbConnectionHandler
export const mariadbHandler = new MariadbConnectionHandler()

