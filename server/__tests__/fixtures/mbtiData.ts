import csvToJson from 'csvtojson'

const PATHS = {
  Questions: '../Data/Questions.csv',
  Answers: '../Data/Test-Cases.csv'
}

const readCSV = async (path: string, option: any = {}): Promise<any> => {
  const result = await csvToJson(option).fromFile(path)
  return result
}

export const loadTestCases = async () => {
  const answers = await readCSV(PATHS.Answers)
  const testCases: {[key: string]: any} = []
  testCases.splice(0, 1)
  const keys = Object.keys(answers[0])
  Object.keys(answers[0]).forEach((key, idx) => {
    if (idx === 0) {
      return
    }
    if (!testCases[idx - 1]) {
      testCases[idx - 1] = {
        name: key,
        responses: []
      }
    }
  })
  answers.forEach((row: any, idx: number) => {
    const keys =Object.keys(row)
    keys.forEach((key, idx) => {
      if (idx === 0) {
        return
      }
      testCases.forEach((c: any) => {
        if (c.name === key) {
          c[row[keys[0]]] = row[key]
          if (Number.isFinite(parseInt(row[key], 10))) {
            c.responses.push(row[key])
          }
        }
      })
    })
  })
  return testCases
}

