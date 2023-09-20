// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import CardContent from '@mui/material/CardContent'


// ** Third Party Imports
import Payment from 'payment'
import Cards from 'react-credit-cards'

// ** Custom Components Imports

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import DialogConfirm from 'src/views/components/dialogs/DialogConfirm'
import { Icon } from '@iconify/react'
import styled from 'styled-components'
import { axiosIns, notiAxiosIns } from 'src/@fake-db/backend'
import { toast } from 'react-hot-toast'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'

const ColumnContainer = styled.div`
display:flex;
flex-direction:column;
row-gap: 1.5rem;
max-width:450px;
width:100%;
margin:1.5rem auto 0 1.5rem;

`


const PaymentMethodCard = () => {
  // ** States
  const [cvc, setCvc] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [focus, setFocus] = useState()
  const [expiry, setExpiry] = useState('')
  const [authNo, setAuthNo] = useState("");
  const [cardPw, setCardPw] = useState("");
  const [userData, setUserData] = useState({})

  const [dialogText, setDialogText] = useState("");
  const [dialogIcon, setDialogIcon] = useState(undefined);
  const [dialogSaveText, setDialogSaveText] = useState("");

  useEffect(() => {
    let user_data = getLocalStorage(LOCALSTORAGE.USER_DATA);
    user_data = JSON.parse(user_data)
    initialPage(user_data)
  }, [])
  const initialPage = (user_data) => {
    setUserData(user_data);
    if (user_data?.bill_key) {
      setCardNumber("")
      setExpiry("")
      setCardPw("")
      setAuthNo("")
      setDialogText("카드를 수정 하시겠습니까?")
      setDialogIcon(<Icon icon='ion:card-outline' style={{ fontSize: '40px' }} />);
      setDialogSaveText("수정");
    } else {
      setCardNumber("")
      setExpiry("")
      setCardPw("")
      setAuthNo("")
      setDialogText("카드를 등록 하시겠습니까?")
      setDialogIcon(<Icon icon='ion:card-outline' style={{ fontSize: '40px' }} />);
      setDialogSaveText("저장");
    }
  }
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
    setExpiry('')
    setCardNumber('')
  }
  const onRegisterBillKey = async (param) => {
    try {
      let obj = {
        amount: 100,
        item_nm: `컴어게인 ${userData?.mcht_name} 가맹점 구독신청`,
        card_num: cardNumber.replaceAll(' ', ''),
        yymm: `${expiry.split('/')[1]}${expiry.split('/')[0]}`,
        instment: '00',
        auth_no: authNo,
        card_pw: cardPw
      }
      const response = await notiAxiosIns().post(`/api/v1/billkey/subscribe${param}`, obj);
      if (response?.status == 200) {
        toast.success("성공적으로 카드가 저장 되었습니다.")
        handleEditConfirmClose();
        setUserData({ ...userData, ['bill_key']: response?.data?.billKey })
        setLocalStorage(LOCALSTORAGE.USER_DATA, JSON.stringify({ ...userData, ['bill_key']: response?.data?.billKey }));
        initialPage({ ...userData, ['bill_key']: response?.data?.billKey })
      }
    } catch (err) {
      toast.error(err?.response?.data?.result_msg)
      handleEditConfirmClose();
      console.log(err);
    }
  }
  const onCancelBillKey = async () => {
    try {
      const response = await notiAxiosIns().post(`/api/v1/billkey/unsubscribe`);
      if (response?.status == 200) {
        toast.success("성공적으로 카드가 취소 되었습니다.")
        handleEditConfirmClose();
        setLocalStorage(LOCALSTORAGE.USER_DATA, JSON.stringify({ ...userData, ['bill_key']: "" }));
        initialPage({ ...userData, ['bill_key']: "" })
      }
    } catch (err) {
      toast.error(err?.response?.data?.result_msg)
      handleEditConfirmClose();
      console.log(err);
    }
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
        onKeepGoing={() => {
          if (userData?.bill_key) {
            onRegisterBillKey('-change');
          } else {
            onRegisterBillKey('');
          }
        }}
        text={dialogText}
        //subText={'삭제하시면 복구할 수 없습니다.'}
        headIcon={dialogIcon}
        saveText={dialogSaveText}
      />
      <Card>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
              <Typography sx={{ mb: 4, fontWeight: 500 }}>구독신청</Typography>
              <Grid container spacing={5} style={{ display: 'flex', width: '100%', flexWrap: 'wrap-reverse' }}>
                <ColumnContainer>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <CardWrapper style={{ margin: '0 auto' }}>
                      <Cards cvc={cvc} focused={focus} expiry={expiry} name={' '} number={cardNumber} />
                    </CardWrapper>
                  </Grid>
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

                  <div style={{ display: 'flex', columnGap: '1.5rem' }}>
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
                    <TextField
                      fullWidth
                      name='cardPw'
                      label='카드비밀번호앞두자리'
                      value={cardPw}
                      autoComplete='off'
                      onBlur={handleBlur}
                      onChange={(e) => { setCardPw(e.target.value) }}
                      inputProps={{ maxLength: '2' }}
                      onFocus={e => setFocus(e.target.name)}
                      placeholder={'00'}
                      maxRows={'2'}
                      type={userData?.bill_key ? 'text' : 'password'}
                    />
                    {/* <TextField
                      fullWidth
                      name='cvc'
                      label='CVC번호'
                      value={cvc}
                      autoComplete='off'
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                      onFocus={e => setFocus(e.target.name)}
                      placeholder={Payment.fns.cardType(cardNumber) === 'amex' ? '1234' : '123'}
                    /> */}
                  </div>
                  <TextField
                    fullWidth
                    name='authNo'
                    label='카드소유자번호'
                    value={authNo}
                    onBlur={handleBlur}
                    onChange={(e) => { setAuthNo(e.target.value) }}
                    onFocus={e => setFocus(e.target.name)}
                    inputProps={{ maxLength: '12' }}
                    placeholder={'생년월일(YYMMDD) 또는 사업자등록번호'}
                  />

                  <Grid item xs={12}>
                    {userData?.bill_key ?
                      <>
                        <Button type='submit' variant='contained' sx={{ mr: 4 }}
                          onClick={onEditConfirmOpen}>
                          카드 수정
                        </Button>
                      </>
                      :
                      <>
                        <Button type='submit' variant='contained' sx={{ mr: 4 }}
                          onClick={onEditConfirmOpen}>
                          카드 등록
                        </Button>
                        <Button type='reset' variant='outlined' color='secondary' onClick={handleResetForm}>
                          리셋
                        </Button>
                      </>}
                  </Grid>
                </ColumnContainer>
                <ColumnContainer>
                </ColumnContainer>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default PaymentMethodCard
