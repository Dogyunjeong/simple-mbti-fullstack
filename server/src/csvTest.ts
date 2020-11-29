import csvParser from 'csv-parse'
import csvToJson from 'csvtojson'
import { promisify } from 'util'
import fs from 'fs'
import calcMBTI from './utils/calcMBTI'
import BPromise from 'bluebird'

const asyncReadFile = promisify(fs.readFile)
const asyncCsvParse = promisify<string | Buffer, csvParser.Options>(csvParser)

const PATHS = {
  Questions: '../../Data/Questions.csv',
  Answers: '../../Data/Test-Cases.csv'
}

const readCSV = async (path: string, option: any = {}): Promise<any> => {
  const result = await csvToJson(option).fromFile(path)
  return result
}

const measureMBTI = async (answers: Object, questions: Object) => {

}

const main = async () => {
  var questions = await asyncCsvParse(await asyncReadFile(PATHS.Questions), { columns: true });

  // var answers = await asyncCsvParse(await asyncReadFile(PATHS.Answers), { columns: true }) as unknown
  const answers = await readCSV(PATHS.Answers)
  const testCases: any[] = []
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
      testCases.forEach((c) => {
        if (c.name === key) {
          c[row[keys[0]]] = row[key]
          if (Number.isFinite(parseInt(row[key], 10))) {
            c.responses.push(row[key])
          }
        }
      })
    })
  })
  const correctness: any[] = []
  await BPromise.mapSeries(testCases, async (test) => {
    const result = await calcMBTI(test.responses)
    console.log("🚀 ~ file: csvTest.ts ~ line 61 ~ name", test.name)
    console.log("🚀 ~ file: csvTest.ts ~ line 62 ~ testCases.forEach ~ test['Result:'] === result", test['Result:'] === result)
    correctness.push({
      name: test.name,
      resutl: test['Result:'] === result
    })
    if (test['Result:'] !== result) {
      console.log("🚀 ~ file: csvTest.ts ~ line 61 ~ testCases.forEach ~ test", test)
      console.log("🚀 ~ file: csvTest.ts ~ line 59 ~ testCases.forEach ~ result", result)
    }
    return
  })
  console.log("🚀 ~ file: csvTest.ts ~ line 60 ~ main ~ correctness", correctness)
}
main()
