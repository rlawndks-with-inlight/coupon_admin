// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import logoSrc, { LOCALSTORAGE } from 'src/data/data'
import { useEffect, useState } from 'react'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import $ from 'jquery';
import { useSettings } from 'src/@core/hooks/useSettings'


// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: '24px',
  fontSize: '1.375rem !important',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  const theme = useTheme()

  const { mode, navCollapsed, dnsData } = settings
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 32) / 8
      }
    } else {
      return 4.5
    }
  }

  const conditionalColors = () => {
    if (mode === 'semi-dark') {
      return {
        '& .MuiTypography-root, & .MuiIconButton-root': {
          color: `rgba(${theme.palette.customColors.dark}, 0.87)`
        }
      }
    } else {
      return {
        '& .MuiTypography-root, & .MuiIconButton-root': {
          color: 'text.primary'
        }
      }
    }
  }
  useEffect(() => {
  }, [navCollapsed])
  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft(), ...conditionalColors() }}>
      <div style={{ width: '20px' }} />
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled href='/manager/users' >
          {navCollapsed && !navHover ?
            <>
              <img src={dnsData?.favicon_img} style={{ height: '22px', width: '22px' }} />
            </>
            :
            <>
              <img src={dnsData[theme.palette.mode == 'dark' ? 'dark_logo_img' : 'logo_img']} style={{ height: 'auto', width: 'auto', maxWidth: '160px', maxHeight: '80px' }} />
            </>}
        </LinkStyled>
      )}
      <div style={{ width: '20px' }} />
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
