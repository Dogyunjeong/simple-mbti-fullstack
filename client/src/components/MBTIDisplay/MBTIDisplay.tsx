import React from 'react'
import MBTIDimesion from './MBTIDimension'

export interface MBTIDisplayProps {
  mbti: string
}
 
const MBTIDisplay: React.FC<MBTIDisplayProps> = ({ mbti }) => {
  return (
    <div>
      <MBTIDimesion
        left="Introversion (I)"
        right="Extraversion (E)"
        leanToRight={mbti[0] === 'E'}
      />
      <MBTIDimesion
        left="Sensing (S)"
        right="Intuition (N)"
        leanToRight={mbti[1] === 'N'}
      />
      <MBTIDimesion
        left="Thinking (T)"
        right="Feeling (F)"
        leanToRight={mbti[2] === 'F'}
      />
      <MBTIDimesion
        left="Judging (J)"
        right="Perceiving (P)"
        leanToRight={mbti[3] === 'P'}
      />
    </div>
  )
}
 
export default MBTIDisplay;