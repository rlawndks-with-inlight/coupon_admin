import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CustomChip from 'src/@core/components/mui/chip'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Avatar, Card } from '@mui/material'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'

const CustomBox = styled(Box)(({ theme }) => ({
  '@media (max-width: 700px)': {
    flexDirection: 'column'
  }
}))
const CustomLeftGrid = styled(Grid)(({ theme }) => ({
  width: '50%',
  maxWidth: '700px',
  minWidth: '300px',
  marginRight: '0.5rem',
  '@media (max-width: 700px)': {
    margin: '0 0 0.5rem 0'
  }
}))
const CustomRightGrid = styled(Grid)(({ theme }) => ({
  width: '50%',
  maxWidth: '700px',
  minWidth: '300px',
  marginLeft: '0.5rem',
  '@media (max-width: 700px)': {
    margin: '0.5rem 0 0 0'
  }
}))
const Index = () => {
  const router = useRouter();
  const [dnsData, setDnsData] = useState({});
  useEffect(() => {
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    setDnsData(dns_data);
  }, [])
  return (
    <CustomBox className='content-center' sx={{ display: 'flex' }}>
      {router.query?.category == 'brands' || !router.query?.category ?
        <>
          <CustomLeftGrid style={{ margin: `${router.query?.category == 'brands' ? '0' : ''}`, maxWidth: `${router.query?.category == 'brands' ? '500px' : ''}` }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  {router.query?.category == 'brands' ?
                    <>
                      <img src={dnsData?.logo_img} style={{ maxWidth: '200px', marginBottom: '1rem' }} />
                    </>
                    :
                    <>
                    </>}
                  <Icon icon={'clarity:building-line'} style={{ fontSize: '70px', marginBottom: '0.5rem' }} />
                  <Typography variant='h5' style={{ fontWeight: 'bold' }}>{'브랜드 가입'}</Typography>
                  <Typography sx={{ mb: 2, mt: 2, color: 'text.secondary', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold' }}>{'월 1,100,000 원 이상'}</div>
                    <div style={{ fontSize: '0.8rem', marginLeft: '0.2rem' }}>{'(부가세 포함)'}</div>
                  </Typography>
                  <Typography sx={{ mb: 5, color: 'text.secondary', fontSize: '0.8rem' }}>{'옵션에 따라서 가격이 변동될 수 있습니다.'}</Typography>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                        '& .MuiChip-root': { cursor: 'pointer' }
                      }}
                    >
                      <CustomChip rounded label='브랜드' skin='light' color='success' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                        '& .MuiChip-root': { cursor: 'pointer' }
                      }}
                    >
                      <CustomChip rounded label='프랜차이즈' skin='light' color='error' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='본사' skin='light' color='warning' />
                    </Box>
                  </Box>
                  <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='쇼핑몰' skin='light' color='info' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='블로그쇼핑몰' skin='light' color='success' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='어플' skin='light' color='error' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='etc' skin='light' color='warning' />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button sx={{ margin: '0 auto 0.5rem auto', width: '100%' }} variant={'contained'}
                      onClick={() => { router.push('/manager/register/brands') }}>
                      {'가입하기'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </CustomLeftGrid>
        </>
        :
        <>
        </>}
      {router.query?.category == 'merchandise' || !router.query?.category ?
        <>
          <CustomRightGrid style={{ margin: `${router.query?.category == 'merchandise' ? '0' : ''}`, maxWidth: `${router.query?.category == 'merchandise' ? '500px' : ''}` }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  {router.query?.category == 'merchandise' ?
                    <>
                      <img src={dnsData?.logo_img} style={{ maxWidth: '200px', marginBottom: '1rem' }} />
                    </>
                    :
                    <>
                    </>}
                  <Icon icon={'solar:shop-outline'} style={{ fontSize: '70px', marginBottom: '0.5rem' }} />
                  <Typography variant='h5' style={{ fontWeight: 'bold' }}>{'가맹점 가입'}</Typography>
                  <Typography sx={{ mb: 2, mt: 2, color: 'text.secondary', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold' }}>{'월 11,000 원'}</div>
                    <div style={{ fontSize: '0.8rem', marginLeft: '0.2rem' }}>{'(부가세 포함)'}</div>
                  </Typography>
                  <Typography sx={{ mb: 5, color: 'text.secondary', fontSize: '0.8rem' }}>{'옵션에 따라서 가격이 변동될 수 있습니다.'}</Typography>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='개인사업자' skin='light' color='success' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='소상공인' skin='light' color='error' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='법인사업자' skin='light' color='warning' />
                    </Box>
                  </Box>
                  <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='일반음식점' skin='light' color='info' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='미용실' skin='light' color='success' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='학원' skin='light' color='error' />
                    </Box>
                    <Box
                      sx={{
                        textDecoration: 'none',
                        '&:not(:last-of-type)': { mr: 2.5 },
                      }}
                    >
                      <CustomChip rounded label='etc' skin='light' color='warning' />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button sx={{ margin: '0 auto 0.5rem auto', width: '100%' }} variant={'contained'}
                      onClick={() => { router.push('/manager/register/merchandise') }}>
                      {'가입하기'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </CustomRightGrid>
        </>
        :
        <>
        </>
      }

    </CustomBox>
  )
}
Index.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default Index
