import BPromise from '../utils/BPromise'
import { mariadbHandler } from '../db/MariadbConnectionHandler'
import ResponseTypes from '../types/ReponseTypes'

class ResponsesModel {
  private async _saveResponse (resultId: number, response: ResponseTypes.Response) {
    await mariadbHandler.query(`
      INSERT INTO responses (mbti_result_id, question_id, response)
      VALUE (?, ?, ?)
    `, [resultId, response.questionId, response.response])
    return
  }

  public async saveReponses (resultId: number, responses: ResponseTypes.Response[]) {
    await BPromise.mapSeries(responses, async (response) => {
      await this._saveResponse(resultId, response)
    })
    return
  }
}

export default ResponsesModel
export const responsesModel = new ResponsesModel()