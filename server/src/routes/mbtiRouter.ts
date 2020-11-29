import express, { Handler, Request } from 'express'
import ResponseTypes from '../types/ReponseTypes'
import { mbtiService } from '../services/MBTIService'
import { handleError, handleResponse } from '../utils/handlers'

const router = express.Router()


router.get('/questions', async (req, res) => {
  try {
    const questions = await mbtiService.loadQuestions()
    return handleResponse(req, res, questions)
  } catch (err) {
    return handleError(req, res, err)
  }
})

router.get('/', async (req: Request<null, null, null, { email: string }>, res) => {
  const email: string = req.query.email
  try {
    const result = await mbtiService.listResultByEmail(email)
    return handleResponse(req, res, result)
  } catch (err) {
    return handleError(req, res, err)
  }
})

router.post('/', async (req: Request<null, null, { email: string, responses: ResponseTypes.Response[]}>, res) => {
  const { email, responses } = req.body
  try {
    const result = await mbtiService.submitTest(email, responses)
    return handleResponse(req, res, result)
  } catch (err) {
    return handleError(req, res, err)
  }
})


router.get('/:mbtiId', async (req: Request<{ mbtiId: string }>, res) => {
  const { mbtiId } = req.params
  try {
    const result = await mbtiService.getMbtiById(parseInt(mbtiId, 10))
    return handleResponse(req, res, result)
  } catch (err) {
    return handleError(req, res, err)
  }
})


export default router