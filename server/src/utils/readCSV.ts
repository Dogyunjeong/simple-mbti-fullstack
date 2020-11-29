import csvToJson from 'csvtojson'
import csvConfig from '../configs/csvConfig'

const readCSV = async (path: string, option: any = {}): Promise<any> => {
  const result = await csvToJson(option).fromFile(path)
  return result
}

const readQuestions = async () => {
  return readCSV(csvConfig.PATHS.Questions)
} 

export default readCSV
export {
  readQuestions,
}
