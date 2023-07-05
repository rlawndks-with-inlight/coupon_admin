// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'

const PickersComponentSmall = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <TextField inputRef={ref} {...props} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} size='small' />
  )
})

export default PickersComponentSmall
