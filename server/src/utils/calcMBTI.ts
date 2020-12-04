import { readQuestions } from './readCSV'

type dimesionResult = { dimension: string, direction: number }

const calcMBTI = async (responses: (string | number)[]) => {
  const questions = await readQuestions()
  const result: dimesionResult[]= []
  questions.forEach((q: any, idx: number) => {
    const response = responses[idx]
    let target: dimesionResult = result.find((r) => r.dimension === q.Dimension)
    if (!target) {
      target = { dimension: q.Dimension, direction: 0 }
      result.push(target)
    }
    if (typeof response === 'string') {
      target.direction = (parseInt(q.Direction, 10) * (parseInt(response, 10) - 4)) + target.direction
    } else {
      target.direction = (q.Direction * (response - 4)) + target.direction
    }
  });
  let MBTI = ''
  result.forEach((r) => {
    MBTI += r.dimension[r.direction > 0 ? 1 : 0]
  })
  return MBTI
}

export default calcMBTI