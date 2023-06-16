// ** MUI Imports
import { Icon } from '@iconify/react'
import { IconButton } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useEffect } from 'react'

const SwipeableDrawer = styled(MuiSwipeableDrawer)({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': {
    listStyle: 'none'
  },
  '& .MuiListItem-gutters': {
    paddingLeft: 4,
    paddingRight: 4
  },
  '& .MuiDrawer-paper': {
    left: 'unset',
    right: 'unset',
    overflowY: 'unset',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
  }
})

const Drawer = props => {
  // ** Props
  const {
    hidden,
    children,
    navHover,
    navWidth,
    settings,
    saveSettings,
    navVisible,
    setNavHover,
    navMenuProps,
    setNavVisible,
    collapsedNavWidth,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hook
  const theme = useTheme()
  // ** Vars
  const { mode, skin, navCollapsed } = settings
  let flag = true

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const drawerColors = () => {
    if (mode === 'semi-dark') {
      return {
        backgroundColor: 'customColors.darkPaperBg'
      }
    } else
      return {
        backgroundColor: 'background.paper'
      }
  }

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible(true),
    onClose: () => setNavVisible(false),
    ModalProps: {
      keepMounted: true // Better open performance on mobile.
    }
  }

  // Drawer Props for Laptop & Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
    onMouseEnter: () => {
      // Declared flag to resolve first time flicker issue while trying to collapse the menu
      if (flag || navCollapsed) {
        setNavHover(true)
        flag = false
      }
    },
    onMouseLeave: () => {
      if (navCollapsed) {
        setNavHover(false)
      }
    }
  }
  let userNavMenuStyle = {}
  let userNavMenuPaperStyle = {}
  if (navMenuProps && navMenuProps.sx) {
    userNavMenuStyle = navMenuProps.sx
  }
  if (navMenuProps && navMenuProps.PaperProps && navMenuProps.PaperProps.sx) {
    userNavMenuPaperStyle = navMenuProps.PaperProps.sx
  }
  const userNavMenuProps = Object.assign({}, navMenuProps)
  delete userNavMenuProps.sx
  delete userNavMenuProps.PaperProps

  const MenuLockedIcon = () => userMenuLockedIcon || <Icon icon='tabler:chevron-left' style={{ fontSize: '1.125rem' }} />
  const MenuUnlockedIcon = () => userMenuUnlockedIcon || <Icon icon='tabler:chevron-right' style={{ fontSize: '1.125rem' }} />
  useEffect(() => {

  }, [])
  return (
    <SwipeableDrawer
      className='layout-vertical-nav'
      variant={hidden ? 'temporary' : 'permanent'}
      {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
      PaperProps={{
        sx: {
          ...drawerColors(),
          ...(!hidden && skin !== 'bordered' && { boxShadow: 6 }),
          width: navCollapsed && !navHover ? collapsedNavWidth : navWidth,
          borderRight: navigationBorderWidth === 0 ? 0 : `${navigationBorderWidth}px solid ${theme.palette.divider}`,
          ...userNavMenuPaperStyle,
          boxShadow: 'none',
          borderRight: `1px dashed rgba(51, 48, 60, 0.12)`
        },
        ...navMenuProps?.PaperProps
      }}
      sx={{
        width: navCollapsed && !navHover ? collapsedNavWidth : navWidth,
        ...userNavMenuStyle,
      }}
      {...userNavMenuProps}
    >
      {window.innerWidth <= 1200 || (navCollapsed && !navHover) ?
        <>
        </>
        :
        <>
          <IconButton
            disableRipple
            disableFocusRipple
            onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
            sx={{
              p: '2px',
              '& svg': {
                fontSize: '1.25rem',
                ...menuCollapsedStyles,
                transition: 'opacity .25s ease-in-out'
              },
              position: 'absolute',
              right: '-12px',
              top: '1rem',
              color: theme.palette.grey[500],
              backgroundColor: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`,
              borderRadius: '50%',
              border: `1px dashed ${theme.palette.grey[300]}`,
            }}
          >
            {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
          </IconButton>
        </>}
      {children}
    </SwipeableDrawer>
  )
}

export default Drawer
