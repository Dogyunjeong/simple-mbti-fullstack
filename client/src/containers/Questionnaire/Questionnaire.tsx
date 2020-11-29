import React from 'react'
import Question from '../../components/Question/Question'
import _ from '../../utils/lodash'
import { useQuestionaireSubmit, useQuestions } from '../../hooks/mbtiHooks'
import InputQuestion from '../../components/Question/InputQuestion'
import Title from '../../components/Typography/Title'
import { Button } from '../../components/Antd'
import { useHistory } from 'react-router-dom'

export interface QuestionnaireProps {
  
}
 
const Questionnaire: React.FC<QuestionnaireProps> = () => {
  const histroy = useHistory()
  const questions = useQuestions()
  const questionnaireSubmitState = useQuestionaireSubmit()
  if (!questions || questions.length === 0) {
    return (<div>Loading....</div>)
  }
  return (
    <div className="questionnaire">
      
      <div className="questionnaire-title">
        <Title>Discover your perspective</Title>
        <p>Complete the 7 min test and get a detailed report of your lenses on the world.</p>
      </div>
      <div className="mbti-question-container">
        {questions.map((question, idx) => {
          return (
            <Question
              key={idx}
              label={question.question}
              onChange={(value) => questionnaireSubmitState.setResponse(question.id, value)}
              value={_.get(
                _.find(questionnaireSubmitState.responses, ({ questionId }) => questionId === question.id),
                'response'
              )}
            />
          )
        })}
        <InputQuestion
          label="Your Email"
          onChange={(email) => questionnaireSubmitState.setEmail(email)}
          value={questionnaireSubmitState.email}
        />
      </div>
      <div className="questionnaire-submit_button-container">
        <Button
          type="primary"
          onClick={async (e) => {
            e.preventDefault()
            if (questionnaireSubmitState.responses.length !== questions.length
            || !questionnaireSubmitState.email) {
              alert('Please filled all the questions')
              return
            }
            const result = await questionnaireSubmitState.submit()
            if (!result) {
              alert('Failed to submit questionnaire')
            } else {
              histroy.push(`/result/${result.id}`)
            }
          }}
        >
          Save & Continue
        </Button>
      </div>
    </div>
  )
}
export default Questionnaire;