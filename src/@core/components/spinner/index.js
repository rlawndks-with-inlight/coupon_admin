// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'

const FallbackSpinner = ({ sx, second }) => {
  const [loadingComponent, setLoadingComponent] = useState(undefined);
  // ** Hook
  useEffect(() => {

    setTimeout(() => {
      setLoadingComponent(
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            ...sx
          }}
        >
          <CircularProgress disableShrink sx={{ m: 'auto' }} />
        </Box>
      )
    }, second)
  }, [])

  return (
    <>
      {loadingComponent}
    </>
  )

}

export default FallbackSpinner
