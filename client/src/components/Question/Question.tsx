import { Radio } from '../../components/Antd'
import React from 'react'

export interface QuestionProps {
  label: string
  onChange: (score: number) => void
  value?: number
}

const Question: React.FC<QuestionProps> = ({ label, value, onChange }) => {
  return (
    <div className="mbti-question grey-border">
      <p className="mbti-question-label">{label}</p>
      <div className="mbti-question-response-container">
        <Radio.Group
          className="mbti-question-select"
          onChange={(e) => {
            e.preventDefault()
            onChange(parseInt(e.target.value, 10))
          }}
          value={value}
        >
          <span className="disagree">Disagree</span>
          {Array.from(Array(7).keys()).map((v) => (
            <Radio key={`${label}-value-${v}`} value={v} />
          ))}
          <span className="agree">Agree</span>
        </Radio.Group>
      </div>
    </div>
  )
}
 
export default Question;