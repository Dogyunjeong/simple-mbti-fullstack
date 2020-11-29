import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MBTIResult from '../containers/MBTIResult/MBTIResult'
import Questionnaire from '../containers/Questionnaire/Questionnaire'

export interface MBTIRouterProps {
  
}
 
const MBTIRouter: React.FC<MBTIRouterProps> = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Questionnaire />
      </Route>
      <Route path="/result/:resultId">
        <MBTIResult />
      </Route>
    </Switch>
  )
}
 
export default MBTIRouter