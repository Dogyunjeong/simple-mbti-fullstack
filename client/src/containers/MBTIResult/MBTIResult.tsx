import * as React from 'react'
import { useParams } from 'react-router-dom'
import MBTIDisplay from '../../components/MBTIDisplay/MBTIDisplay'
import Title from '../../components/Typography/Title'
import { useMbtiResult } from '../../hooks/mbtiHooks'


export interface MBTIResultProps {
  
}
 
const MBTIResult: React.FC<MBTIResultProps> = () => {
  const { resultId } = useParams<{ resultId: string }>()
  const mbtiResult = useMbtiResult(resultId)
  if (!mbtiResult?.id) {
    return (<div>Loading...</div>)
  }
  return (
    <div className="mbti-result-container grey-border">
      <div className="mbti-result-section">
        <Title style={{ fontSize: '26px'}}>Your Perspective</Title>
        <p><b>Your Perspective Type is {mbtiResult.mbti}</b></p>
      </div>
      <div className="mbti-result-section">
        <MBTIDisplay
          mbti={mbtiResult.mbti}
        />
      </div>
    </div>
  )
}
 
export default MBTIResult;