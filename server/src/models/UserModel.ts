import UserTypes from '../types/UserTypes'
import { mariadbHandler } from '../db/MariadbConnectionHandler'

class UserModel {
  public async save(userCreate: UserTypes.UserCreate): Promise<{ id: number }> {
    const result = await mariadbHandler.query(`
      INSERT INTO users (email)
      VALUE (?)
    `, [userCreate.email])
    
    return { id: result.insertId }
  }

  public async getByEmail(email: string): Promise<UserTypes.User> {
    const user = await mariadbHandler.query(`
      SELECT *
      FROM users
      WHERE email=?
    `, [email])
    return user
  }
}

export default UserModel
export const userModel = new UserModel()