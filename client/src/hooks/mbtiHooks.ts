import { useState, useEffect } from 'react'
import QuestionTypes from '../types/QuestionTypes'
import ResponseTypes from '../types/ReponseTypes'
import { mbtiRequest } from '../utils/Request'
import _ from '../utils/lodash'
import MbtiResultTypes from '../types/MbtiResultTypes'

export const useQuestions = () => {
  const [questions, setQuestions] = useState<QuestionTypes.Question[]>([])
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await mbtiRequest.get('/questions')
        setQuestions(result.data.data)
      } catch (err) {
        console.error('Fetch questions failed', err)
      }
    }
    fetchQuestions()
  }, [])
  return questions
}

export const useQuestionaireSubmit = () => {
  const [responses, setResponses] = useState<ResponseTypes.Response[]>([])
  const [email, setEmail] = useState<string>('')
  const setResponse = (qId: number, value: number) => {
    const target: { questionId: number, response?: number} = _.find(responses, ({ questionId }) => questionId === qId) || {
      questionId: qId
    }
    target.response = value
    setResponses(_.sortBy([...responses, target] as ResponseTypes.Response[] , 'questionId'))
  }
  const submit = async (): Promise<{ id: string } | undefined> => {
    try {
      const result =await mbtiRequest.post('/', {
        email,
        responses: responses.sort((a, b) => b.questionId - a.questionId)
      })
      return {
        id: result.data.data.id
      }
    } catch (err) {
      console.error('failed to submit questionare: ', err)
    }
  }
  return {
    responses,
    setResponse,
    submit,
    email,
    setEmail,
  }
}

export const useMbtiResult = (mbtiIdStr: string) => {
  const [mbtiResult, setMbtiResult] = useState<MbtiResultTypes.MbtiResult>()
  useEffect(() => {
    const fetchMbtiResult = async () => {
      try {
        const result = await mbtiRequest.get(`/${mbtiIdStr}`)
        setMbtiResult(result.data.data)
      } catch (err) {
        console.error('Fetch mbtiResult failed', err)
      }
    }
    if (mbtiIdStr) {
      fetchMbtiResult()
    }
  }, [mbtiIdStr])
  return mbtiResult
}