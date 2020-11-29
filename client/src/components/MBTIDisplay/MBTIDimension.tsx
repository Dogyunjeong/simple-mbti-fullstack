import React from 'react'

export interface MBTIDimesionProps {
  left: string
  right: string
  leanToRight: boolean
}
 
const MBTIDimesion: React.FC<MBTIDimesionProps> = ({ left, right, leanToRight}) => {
  return (
    <div className="mbti-display">
      <div className="mbti-meaning">
        {left}
      </div>
      <div className="mbti-dimension">
        <div className={`mbti-dimension-part ${!leanToRight ? 'mbti-dimesion-selected' : ''}` } />
        <div className={`mbti-dimension-part ${leanToRight ? 'mbti-dimesion-selected' : ''}` } />
      </div>
      <div className="mbti-meaning">
        {right}
      </div>
    </div>
  )
}
 
export default MBTIDimesion;