import React from 'react'
import { withRouter } from 'react-router'

const styles = {
  cursor: 'pointer'
}
export default withRouter((props) => {
  const {history, text, url} = props
  return (
    <a
      style={{...styles, ...props.style}}
      onClick={() => { history.push(url) }}>
      {text}
    </a>
  )
})
