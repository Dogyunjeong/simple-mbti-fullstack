import calcMBTI from '../src/utils/calcMBTI'
import { loadTestCases } from './fixtures/mbtiData'
describe('Test MBTI calculation is correct with given answers example', () => {
  let testCases: any
  beforeAll(async (done) => {
    testCases = await loadTestCases()
    done()
  })
  test.each(['A', 'B', 'D', 'E', 'F', 'G', 'H'])(
    'Test case %s',
    async (testNo) => {
      const test = testCases.shift()
      expect(test.name).toBe(`Test Case ${testNo}`)
      const result = await calcMBTI(test.responses)
      expect(test['Result:']).toBe(result)
    }
  )
})
