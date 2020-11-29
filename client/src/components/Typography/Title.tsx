import * as React from 'react'

export interface TitleProps {
  style?: any
}
 
const Title: React.FC<TitleProps> = ({ children, style }) => {
  return (
    <h4 className="typography-title-color typography-title" style={style}>{children}</h4>
  )
}
 
export default Title;