import { Input } from '../../components/Antd'
import React from 'react'

export interface InputQuestionProps {
  label: string
  onChange: (text: string) => void
  value: string
}

const InputQuestion: React.FC<InputQuestionProps> = ({ label, value, onChange }) => {
  return (
    <div className="mbti-question grey-border">
      <p className="mbti-question-label">{label}</p>
      <div className="mbti-question-response-container">
        <Input
          onChange={(e) => {
            e.preventDefault()
            onChange(e.target.value)
          }}
          value={value}
        />
      </div>
    </div>
  )
}
 
export default InputQuestion;