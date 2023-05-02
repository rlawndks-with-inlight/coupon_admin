// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
// ** Icon Imports
import styled from 'styled-components'
import { Row, themeObj } from './style-component'
import { Icon } from '@iconify/react'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect } from 'react'
import Slide from '@mui/material/Slide'
import { commarNumber, detetimeFormat } from 'src/@core/utils/function'
import Barcode from 'react-barcode'
import QRCode from 'qrcode.react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />
})

const PointContainer = styled.div`
display: flex;
border-bottom: 1px solid ${themeObj.grey[300]};
padding: 0.75rem 0;
align-items:flex-start;
`
const PointExplain = styled.div`
margin-left: 1rem;
font-size:${themeObj.font_size.font4};
`
const CardContainer = styled.div`
margin:0.25rem auto 0.75rem auto;
width:100%;
max-width:600px;
padding: 1vw;
border-radius:16px;
`
const CardContent = styled.div`
padding: 3vw;
border-radius:16px;
display:flex;
flex-direction:column;
`

const CouponContetnt = (props) => {
  const { item, dnsData, theme } = props;
  return (
    <>
      <CardContainer style={{
        background: `${dnsData?.theme_css?.main_color}`
      }}>
        <div style={{
          fontWeight: 'bold',
          color: themeObj.yellow,
          margin: '0.5rem auto 0.5rem 12px'
        }}>Coupon</div>
        <CardContent style={{
          background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color : '#fff'}`
        }}>
          <img src={item?.coupon_img} style={{ margin: '0 auto', maxWidth: '300px', width: '80%' }} />
          <div style={{ margin: '0.5rem auto 0 auto' }}>{item?.name}</div>
          <div style={{ width: '100%', display: 'flex' }} className='membership-barcode'>
            {item?.code_type == 1 ?
              <>
                <QRCode value={item?.barcode_num} style={{ margin: '0.5rem auto' }} />
              </>
              :
              <>
                <Barcode
                  format='CODE128'
                  textMargin={10}
                  value={item?.barcode_num}
                  height={'52px'}
                  style={{ margin: '0 auto' }}
                />
              </>}
          </div>
        </CardContent>
      </CardContainer>
    </>
  )
}
const StampContetnt = (props) => {
  const { item } = props;
  return (
    <>
    </>
  )
}
const getPointHistoryString = (item) => {

}
const PointContetnt = (props) => {
  const { item, idx } = props;

  return (
    <>
      <PointContainer>
        <img src={item?.profile_img}
          style={{ height: '72px', borderRadius: '10px' }} />
        <PointExplain style={{ width: '' }}>
          <Row style={{ fontWeight: 'bold' }}>
            <div style={{ width: '50px' }}>가맹점:</div>
            <div>{item?.mcht_name}</div>
          </Row>
          <Row>
            <Row>
              <div style={{ width: '50px' }}>구매:</div>
              <div style={{ width: '72px' }}>{commarNumber(item?.purchase_price)} &#8361;</div>
            </Row>
            <Row>
              <div style={{ width: '50px' }}>적립:</div>
              <div style={{ color: `${themeObj.blue}`, width: '72px' }}>+{commarNumber(item?.save_amount)} P</div>
            </Row>
          </Row>
          <Row>
            <Row>
              <div style={{ width: '50px' }}>사용:</div>
              <div style={{ color: `${themeObj.red}`, width: '72px' }}>-{commarNumber(item?.use_amount)} P</div>
            </Row>
            <Row style={{ fontWeight: 'bold' }}>
              <div style={{ width: '50px' }}>변동:</div>
              <div style={{ color: `${item?.save_amount - item?.use_amount >= 0 ? themeObj.blue : themeObj.red}`, width: '72px' }}>
                {item?.save_amount - item?.use_amount >= 0 ? '+' : ''}
                {commarNumber(item?.save_amount - item?.use_amount)} P
              </div>
            </Row>
          </Row>
          <Row style={{ margin: '0.25rem 0.25rem 0 0' }}>
            <div style={{ color: themeObj.grey[500], marginLeft: '122px' }}>{item?.updated_at}</div>
          </Row>
        </PointExplain>
      </PointContainer>
    </>
  )
}
const DialogMemberships = (props) => {
  // ** State
  const { open, handleClose, dnsData, style, data, membershipCategory, mcht, theme } = props;

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }
  useEffect(() => {
  }, [])
  useEffect(() => {
    setTabValue(membershipCategory)
  }, [open])

  const [tabValue, setTabValue] = useState('')
  return (
    <div>
      <Dialog fullScreen onClose={handleClose} aria-labelledby='full-screen-dialog-title' open={open} TransitionComponent={Transition}>
        <div style={{ ...style, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <DialogTitle id='full-screen-dialog-title' style={{}}>
            <Typography variant='h6' component='span' style={{ display: 'flex' }}>
              <div style={{ display: 'flex', margin: 'auto', fontWeight: 'bold' }}>
                멤버십 자세히보기
              </div>
            </Typography>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{ top: 16, right: 12, position: 'absolute', color: 'grey.500' }}
            >
              <Icon icon='tabler:x' style={{ fontSize: themeObj.font_size.font1 }} />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0 1.5rem 1.25rem 1.5rem' }}>
            <TabContext value={tabValue}>
              <TabList onChange={handleChange} aria-label='simple tabs example' variant='fullWidth'>
                <Tab value='points' label='포인트' style={{ padding: '12px 16px', display: `${mcht?.point_flag == 1 ? '' : 'none'}` }} />
                <Tab value='stamps' label='스탬프' style={{ padding: '12px 16px', display: `${mcht?.stamp_flag == 1 ? '' : 'none'}` }} />
                <Tab value='coupons' label='쿠폰' style={{ padding: '12px 16px' }} />
              </TabList>
              <TabPanel value='points' style={{ padding: '0' }}>
                {data?.points && data?.points.map((item, idx) => (
                  <>
                    <PointContetnt
                      item={item}
                    />
                  </>
                ))}
              </TabPanel>
              <TabPanel value='stamps' style={{ padding: '0' }}>
                {data?.stamps && data?.stamps.map((item, idx) => (
                  <>
                    <StampContetnt
                      item={item}
                    />
                  </>
                ))}
              </TabPanel>
              <TabPanel value='coupons' style={{ padding: '0' }}>
                {data?.coupons && data?.coupons.map((item, idx) => (
                  <>
                    <CouponContetnt
                      item={item}
                      dnsData={dnsData}
                      theme={theme}
                    />
                  </>
                ))}
              </TabPanel>
            </TabContext>
          </DialogContent>

        </div>
        <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
      </Dialog>
    </div>
  )
}

export default DialogMemberships
