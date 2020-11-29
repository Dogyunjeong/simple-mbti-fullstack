import calcMBTI from '../utils/calcMBTI'
import { mbtiResultModel } from '../models/MBTIResultModel'
import { userModel } from '../models/UserModel'
import ResponseTypes from '../types/ReponseTypes'
import { responsesModel } from '../models/ResponsesModel'
import { questionModel } from '../models/QuestionModel'
import MbtiResultTypes from '../types/MbtiResultTypes'

class MBTIService {

  public async loadQuestions() {
    const questions = await questionModel.list()
    return questions
  }
  public async listResultByEmail (email: string) {
    const user = await userModel.getByEmail(email)
    const results = await mbtiResultModel.listByUserId(user.id)
    return results
  }

  // Ingnore transaction due to fast building
  public async submitTest(email: string, reqResponse: ResponseTypes.Response[]): Promise<{ id: number }> {
    const responses = reqResponse.sort((a, b) => b.questionId - a.questionId)
    // Just use csv question data
    const mbtiResult = await calcMBTI(responses.map(({ response }) => response))
    const user = await userModel.save({ email })
    const mbti = await mbtiResultModel.save(user.id, mbtiResult)
    await responsesModel.saveReponses(mbti.id, responses)
    return mbti
  }

  public async getMbtiById(mbtiId: number): Promise<MbtiResultTypes.MbtiResult> {
    const mbti = mbtiResultModel.get(mbtiId)
    return mbti
  }
}

export default MBTIService
export const mbtiService = new MBTIService()