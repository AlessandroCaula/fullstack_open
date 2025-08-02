import { Button } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear'
import CreateIcon from '@mui/icons-material/Create'
import PropTypes from "prop-types"
import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // useImperativeHandle hook to make toggleVisibility functionality available outside the component.
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button 
          onClick={toggleVisibility}
          style={{ marginBottom: '5px' }}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<CreateIcon />}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {/* <button onClick={toggleVisibility}>Cancel</button> */}
        <Button
          onClick={toggleVisibility}
          style={{ marginBottom: '5px' }}
          variant="contained" 
          color="error" 
          size="small"
          margin="dense"
          startIcon={<ClearIcon />}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable