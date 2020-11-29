import MbtiResultTypes from '../types/MbtiResultTypes'
import { mariadbHandler } from '../db/MariadbConnectionHandler'

class MBTIResultModel {
  public async save(userId: number, mbti: string): Promise<{ id: number }> {
    const result = await mariadbHandler.query(`
      INSERT INTO mbti_results (user_id, mbti)
      VALUE (?, ?)
    `, [userId, mbti])
    return { id: result.insertId }
  }
  public async get(resultId: number): Promise<MbtiResultTypes.MbtiResult> {
    const result = await mariadbHandler.query(`
      SELECT *
      FROM mbti_results
      WHERE id=?
    `, [resultId])
    if (!result) {
      return
    }
    return result[0]
  }
  public async listByUserId(userId: number) {
    const result = await mariadbHandler.query(`
      SELECT mbti created_at
      FROM mbti_results
      WHERE user_id=?
    `, [userId])
    return result
  }
}

export default MBTIResultModel
export const mbtiResultModel = new MBTIResultModel()