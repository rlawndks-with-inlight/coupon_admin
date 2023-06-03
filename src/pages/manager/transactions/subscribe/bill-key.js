// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import DialogTitle from '@mui/material/DialogTitle'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Third Party Imports
import Payment from 'payment'
import Cards from 'react-credit-cards'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import DialogConfirm from 'src/views/components/dialogs/DialogConfirm'
import { Icon } from '@iconify/react'

const CreditCardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.down('xl')]: {
    '& > div:first-of-type': {
      marginBottom: theme.spacing(6)
    }
  },
  [theme.breakpoints.up('xl')]: {
    alignItems: 'center',
    flexDirection: 'row',
    '& > div:first-of-type': {
      marginRight: theme.spacing(6)
    }
  }
}))

const data = [
  {
    cardCvc: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    badgeColor: 'primary',
    cardStatus: 'Primary',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: '/images/logos/mastercard.png'
  },
  {
    cardCvc: '681',
    imgAlt: 'Visa card',
    expiryDate: '02/24',
    name: 'Mildred Wagner',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: '/images/logos/visa.png'
  }
]

const PaymentMethodCard = () => {
  // ** States
  const [name, setName] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [focus, setFocus] = useState()
  const [expiry, setExpiry] = useState('')

  const handleBlur = () => setFocus(undefined)
  const handleSelectedCardBlur = () => setFocus(undefined)
  const handleInputChange = ({ target }) => {
    if (target.name === 'cardNumber') {
      target.value = formatCreditCardNumber(target.value, Payment)
      setCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
      setExpiry(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value, cardNumber, Payment)
      setCvc(target.value)
    }
  }



  const handleResetForm = () => {
    setCvc('')
    setName('')
    setExpiry('')
    setCardNumber('')
  }

  const onRegisterBillKey = async () => {

  }

  const [editConfirmOpen, setEditConfirmOpen] = useState(false);
  const handleEditConfirmClose = () => setEditConfirmOpen(false)
  const onEditConfirmOpen = (obj) => {
    setEditConfirmOpen(true);
  }
  return (
    <>
      <DialogConfirm
        open={editConfirmOpen}
        handleClose={handleEditConfirmClose}
        onKeepGoing={onRegisterBillKey}
        text={`카드를 등록 하시겠습니까?`}
        //subText={'삭제하시면 복구할 수 없습니다.'}
        headIcon={<Icon icon='ion:card-outline' style={{ fontSize: '40px' }} />}
        saveText={'저장'}
      />
      <Card>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
              <Typography sx={{ mb: 4, fontWeight: 500 }}>카드 빌키 등록하기</Typography>
              <Grid container spacing={5} style={{ flexDirection: 'column', display: 'flex', width: '100%' }}>
                <Grid item xs={12}>
                  <CreditCardWrapper>
                    <CardWrapper style={{ margin: '0 auto' }}>
                      <Cards cvc={cvc} focused={focus} expiry={expiry} name={name} number={cardNumber} />
                    </CardWrapper>
                  </CreditCardWrapper>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      name='cardNumber'
                      value={cardNumber}
                      autoComplete='off'
                      label='카드 번호 입력'
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      placeholder='0000 0000 0000 0000'
                      onFocus={e => setFocus(e.target.name)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='name'
                    value={name}
                    autoComplete='off'
                    onBlur={handleBlur}
                    label='카드사용자명'
                    placeholder='홍길동'
                    onChange={e => setName(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    name='expiry'
                    label='만료일'
                    value={expiry}
                    onBlur={handleBlur}
                    placeholder='MM/YY'
                    onChange={handleInputChange}
                    inputProps={{ maxLength: '5' }}
                    onFocus={e => setFocus(e.target.name)}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    name='cvc'
                    label='CVC번호'
                    value={cvc}
                    autoComplete='off'
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    onFocus={e => setFocus(e.target.name)}
                    placeholder={Payment.fns.cardType(cardNumber) === 'amex' ? '1234' : '123'}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' sx={{ mr: 4 }}
                onClick={onEditConfirmOpen}>
                카드 등록
              </Button>
              <Button type='reset' variant='outlined' color='secondary' onClick={handleResetForm}>
                리셋
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default PaymentMethodCard
