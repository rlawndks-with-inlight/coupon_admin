// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import $ from 'jquery';
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@emotion/react'

const notifications = [
  {
    meta: '알림',
    avatarAlt: 'Flora',
    title: '환영합니다 ! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: ''
  },
]

const shortcuts = [
  {
    title: 'Calendar',
    url: '/apps/calendar',
    icon: 'tabler:calendar',
    subtitle: 'Appointments'
  },
  {
    title: 'Invoice App',
    url: '/apps/invoice/list',
    icon: 'tabler:file-invoice',
    subtitle: 'Manage Accounts'
  },
  {
    title: 'User App',
    icon: 'tabler:users',
    url: '/apps/user/list',
    subtitle: 'Manage Users'
  },
  {
    url: '/apps/roles',
    icon: 'tabler:lock',
    subtitle: 'Permissions',
    title: 'Role Management'
  },
  {
    subtitle: 'CRM',
    title: 'Dashboard',
    url: '/dashboards/crm',
    icon: 'tabler:device-analytics'
  },
  {
    title: 'Settings',
    icon: 'tabler:settings',
    subtitle: 'Account Settings',
    url: '/pages/account-settings/account'
  },
  {
    icon: 'tabler:help',
    title: 'Help Center',
    url: '/pages/help-center',
    subtitle: 'FAQs & Articles'
  },
  {
    title: 'Dialogs',
    icon: 'tabler:square',
    subtitle: 'Useful Popups',
    url: '/pages/dialog-examples'
  }
]

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  const theme = useTheme();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [curZoom, setCurZoom] = useState(100);
  useEffect(() => {
    settingLocalStorage();
  }, [])

  const settingLocalStorage = async () => {
    let cur_zoom = await getLocalStorage(LOCALSTORAGE.CUR_ZOOM);
    if (!cur_zoom) {
      cur_zoom = 100;
    } else {
      cur_zoom = parseInt(cur_zoom)
    }
    setCurZoom(cur_zoom);
    document.body.style.zoom = `${cur_zoom}%`;
    await setLocalStorage(LOCALSTORAGE.IS_FULL_SCREEN, false);
  }

  const onChangeZoom = async (type) => {
    let cur_zoom = await getLocalStorage(LOCALSTORAGE.CUR_ZOOM);
    if (!cur_zoom) {
      cur_zoom = 100;
    } else {
      cur_zoom = parseInt(cur_zoom)
    }
    if (cur_zoom >= 200 && type > 0) {
      toast.error('더 이상 늘릴 수 없습니다.');

      return;
    }
    if (cur_zoom <= 50 && type < 0) {
      toast.error('더 이상 줄일 수 없습니다.');

      return;
    }
    if (type > 0) {
      cur_zoom += 10;
    } else {
      cur_zoom -= 10;
    }
    await setLocalStorage(LOCALSTORAGE.CUR_ZOOM, cur_zoom);
    setCurZoom(cur_zoom);
    document.body.style.zoom = `${cur_zoom}%`;
  }

  const onChangeFullScreen = async () => {
    let is_full_screen = await getLocalStorage(LOCALSTORAGE.IS_FULL_SCREEN);
    is_full_screen = JSON.parse(is_full_screen);
    if (is_full_screen) {
      is_full_screen = false;
    } else {
      is_full_screen = true;
    }
    await setLocalStorage(LOCALSTORAGE.IS_FULL_SCREEN, is_full_screen);
    setIsFullScreen(is_full_screen);
    if (is_full_screen) {
      if (document.fullscreenElement == null)
        document.documentElement.requestFullscreen();
    } else {
      if (document.fullscreenElement != null)
        document.exitFullscreen();
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon fontSize='1.5rem' icon='tabler:menu-2' />
          </IconButton>
        ) : null}
        {/* <Autocomplete hidden={hidden} settings={settings} /> */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {window.innerWidth >= 700 ?
          <>

            <div>
              <ButtonGroup variant='outlined' sx={{ height: '26px', border: 'none', mr: 2, fontWeight: 'bold' }}>
                <Button sx={{ ...ButtonGroupStyle(theme), fontSize: '16px' }} onClick={() => onChangeZoom(-1)}>-</Button>
                <Button sx={{ ...ButtonGroupStyle(theme), cursor: 'default', pointerEvents: 'none' }}>{curZoom}%</Button>
                <Button sx={{ ...ButtonGroupStyle(theme), fontSize: '16px' }} onClick={() => onChangeZoom(1)}>+</Button>
              </ButtonGroup>
            </div>
            <IconButton color='inherit' aria-haspopup='true' onClick={onChangeFullScreen}>
              {isFullScreen ?
                <>
                  <Icon fontSize='1.5rem' icon="tabler:arrows-minimize" />
                </>
                :
                <>
                  <Icon fontSize='1.5rem' icon="tabler:arrows-maximize" />
                </>}
            </IconButton>
          </>
          :
          <>
          </>}

        {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} /> */}
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
        <NotificationDropdown settings={settings} notifications={notifications} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

const ButtonGroupStyle = (theme) => {
  return {
    color: `${theme.palette.mode == 'dark' ? '#eeeeee' : 'rgba(51, 48, 60, 0.87)'}`
    , border: 'none',
    padding: '2px 2px',
    fontWeight: 'bold'
  }
}

export default AppBarContent
