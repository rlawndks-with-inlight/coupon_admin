// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
// ** Icon Imports
import { Row, themeObj } from './style-component'
import { Icon } from '@iconify/react'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect } from 'react'
import Slide from '@mui/material/Slide'
import { commarNumber, detetimeFormat } from 'src/@core/utils/function'
import Barcode from 'react-barcode'
import QRCode from 'qrcode.react'
import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material'
import { DialogContent } from '@mui/material';

const CustomizedDialogContent = styled(DialogContent)(({ theme }) => ({
  paddingTop: '0px !important'
}));
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
font-size:${themeObj.font_size.font4};
width:100%;
`
const CardContainer = styled.div`
width:100%;
max-width:600px;
margin: 0 auto;
position:relative;
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
      <CardContainer>
        <div
          style={{
            position: 'absolute',
            borderBottom: `1px dashed ${themeObj.grey[400]}`,
            top: 0,
            left: '-5vw',
            right: '-5vw',
            bottom: 0,
          }} />
        <CardContent style={{
          background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : '#fff'}`
        }}>
          <img src={item?.coupon_img} style={{ margin: '0 auto', width: '200px', borderRadius: '8px', boxShadow: `4px 4px 8px #00000055` }} />
          <div style={{ margin: '1rem auto 0 auto', fontWeight: 'bold' }}>{item?.name}</div>
          <div style={{ margin: '0.25rem auto 0.5rem auto', fontSize: themeObj.font_size.font3 }}>
            {item?.valid_e_dt} ~ {item?.valid_s_dt}
          </div>
          <div style={{ width: '100%', display: 'flex' }} className='membership-barcode'>
            {item?.code_type == 1 ?
              <>
                <QRCode value={item?.barcode_num} style={{ margin: '0.75rem auto 0.5rem auto', width: '84px', height: 'auto' }} />
              </>
              :
              <>
                <Barcode
                  format='CODE128'
                  textMargin={10}
                  value={item?.barcode_num}
                  height={'44px'}
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
  const { item, idx, dnsData, pointType } = props;

  const getPointItem = (item) => {
    if (item?.type == 1) {
      return (
        <>
          <Row style={{ fontWeight: 'bold' }}>
            <div>{item?.mcht_name}</div>
            <div style={{ marginLeft: 'auto', color: themeObj.blue }}>+{commarNumber(item?.point)}P</div>
          </Row>
          <Row style={{ color: themeObj.grey[500] }}>
            <div style={{ borderRight: `1px solid ${themeObj.grey[300]}`, paddingRight: '0.25rem' }}>{item?.updated_at.substring(0, 16)}</div>
            <div style={{ paddingLeft: '0.25rem' }}>적립</div>
            <Row style={{ marginLeft: 'auto' }}>
              <div>잔액포인트:</div>
              <div style={{ width: '58px', textAlign: 'end', fontWeight: 'bold' }}>{commarNumber(item?.sum_point)}P</div>
            </Row>
          </Row >

        </>
      )
    } else if (item?.type == -1) {
      return (
        <>
          <Row style={{ fontWeight: 'bold' }}>
            <div>{item?.mcht_name}</div>
            <div style={{ marginLeft: 'auto', color: themeObj.red }}>-{commarNumber(item?.point)}P</div>
          </Row>
          <Row style={{ color: themeObj.grey[500] }}>
            <div style={{ borderRight: `1px solid ${themeObj.grey[300]}`, paddingRight: '0.25rem' }}>{item?.updated_at.substring(0, 16)}</div>
            <div style={{ paddingLeft: '0.25rem' }}>사용</div>
            <Row style={{ marginLeft: 'auto' }}>
              <div>잔액포인트:</div>
              <div style={{ width: '58px', textAlign: 'end', fontWeight: 'bold' }}>{commarNumber(item?.sum_point)}P</div>
            </Row>
          </Row>
        </>
      )
    }
  }
  return (
    <>
      {pointType == 'all' || item?.type == pointType ?
        <>
          <PointContainer>
            <PointExplain>
              {getPointItem(item)}
            </PointExplain>
          </PointContainer>
        </>
        :
        <>
        </>
      }

    </>
  )
}
const DialogMemberships = (props) => {
  // ** State
  const { open, handleClose, dnsData, style, data, membershipCategory, mcht, theme } = props;

  const [pointType, setPointType] = useState('all');
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }
  useEffect(() => {
  }, [])
  useEffect(() => {
    setTabValue(membershipCategory)
    setPointType('all')
  }, [open])

  const [tabValue, setTabValue] = useState('')
  return (
    <div>
      <Dialog fullScreen onClose={handleClose} aria-labelledby='full-screen-dialog-title' open={open} TransitionComponent={Transition}>
        <div style={{ ...style, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <DialogTitle id='full-screen-dialog-title' style={{ paddingBottom: '1rem' }}>
            <Typography variant='h6' component='span' style={{ display: 'flex' }}>
              <div style={{ display: 'flex', margin: 'auto', fontWeight: 'bold', fontSize: themeObj.font_size.font3 }}>
                자세히보기
              </div>
            </Typography>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{ top: 12, right: 12, position: 'absolute', color: 'grey.500' }}
            >
              <Icon icon='tabler:x' style={{ fontSize: themeObj.font_size.font1 }} />
            </IconButton>
          </DialogTitle>
          <CustomizedDialogContent style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TabContext value={tabValue}>
              <TabList onChange={handleChange} aria-label='simple tabs example' variant='fullWidth'>
                <Tab value='points' label='포인트' style={{ padding: '0 16px', display: `${mcht?.point_flag == 1 ? '' : 'none'}` }} />
                <Tab value='stamps' label='스탬프' style={{ padding: '0 16px', display: `${mcht?.stamp_flag == 1 ? '' : 'none'}` }} />
                <Tab value='coupons' label='쿠폰' style={{ padding: '0 16px' }} />
              </TabList>
              <TabPanel value='points' style={{ padding: '0' }}>
                <Row style={{ marginTop: '0.5rem' }}>
                  <Button variant={pointType == 'all' ? 'contained' : 'outlined'} size='small' onClick={() => setPointType('all')}>
                    전체
                  </Button>
                  <Button variant={pointType == '1' ? 'contained' : 'outlined'} size='small' sx={{ ml: '0.5rem' }} onClick={() => setPointType('1')}>
                    적립
                  </Button>
                  <Button variant={pointType == '-1' ? 'contained' : 'outlined'} size='small' sx={{ ml: '0.5rem' }} onClick={() => setPointType('-1')}>
                    사용
                  </Button>
                </Row>
                {data?.points && data?.points.map((item, idx) => (
                  <>
                    <PointContetnt
                      item={item}
                      dnsData={dnsData}
                      pointType={pointType}
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
              <TabPanel value='coupons' style={{ padding: '0', position: 'relative' }}>
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
          </CustomizedDialogContent>

        </div>
        <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
      </Dialog>
    </div>
  )
}

export default DialogMemberships
