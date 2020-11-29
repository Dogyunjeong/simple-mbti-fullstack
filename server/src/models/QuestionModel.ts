import { mariadbHandler } from '../db/MariadbConnectionHandler'

class QuestionModel {
  public async list () {
    const result = await mariadbHandler.query(`
      SELECT *
      FROM questions
    `)
    return result
  }
}

export default QuestionModel
export const questionModel = new QuestionModel()