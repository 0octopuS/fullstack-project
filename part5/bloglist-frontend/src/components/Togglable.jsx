import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// 5.5 creating blog posts so that it is only displayed when appropriate
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    // props.setTogglableVisible(true);
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={hideWhenVisible} >
        <button id={props.buttonLabel} onClick={toggleVisibility}  >{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} >
        {props.children}
        <button id='toggleCancel-button' onClick={toggleVisibility}> cancel </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'


export default Togglable