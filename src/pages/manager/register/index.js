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

  return (
    <CustomBox className='content-center' sx={{ display: 'flex' }}>
      {router.query?.category == 'brands' || !router.query?.category ?
        <>
          <CustomLeftGrid style={{ margin: `${router.query?.category == 'brands' ? '0' : ''}`, maxWidth: `${router.query?.category == 'brands' ? '500px' : ''}` }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Icon icon={'clarity:building-line'} style={{ fontSize: '100px', marginBottom: '0.5rem' }} />
                  <Typography variant='h5'>{'브랜드 가입'}</Typography>
                  <Typography sx={{ mb: 1, color: 'text.secondary' }}>{'프랜차이즈 및 여러가맹점 보유 업체'}</Typography>
                  <Typography sx={{ mb: 1, color: 'text.secondary' }}>{'최소금액 월 1,000,000₩ ~'}</Typography>
                  <Typography sx={{ mb: 5, color: 'text.secondary' }}>{'옵션에 따라서 가격이 변동될 수 있습니다.'}</Typography>
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
                    <Button sx={{ margin: '0 auto', width: '100%' }} variant={'contained'}
                      onClick={() => { router.push('/manager/register/brands') }}>
                      <Icon fontSize='1.125rem' icon={'tabler:user-plus'} />
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
                  <Icon icon={'solar:shop-outline'} style={{ fontSize: '100px', marginBottom: '0.5rem' }} />
                  <Typography variant='h5'>{'가맹점 가입'}</Typography>
                  <Typography sx={{ mb: 1, color: 'text.secondary' }}>{'소상공인 및 하나의 업체'}</Typography>
                  <Typography sx={{ mb: 1, color: 'text.secondary' }}>{'최소금액 월 10,000₩ ~'}</Typography>
                  <Typography sx={{ mb: 5, color: 'text.secondary' }}>{'옵션에 따라서 가격이 변동될 수 있습니다.'}</Typography>
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
                    <Button sx={{ margin: '0 auto', width: '100%' }} variant={'contained'}
                      onClick={() => { router.push('/manager/register/merchandise') }}>
                      <Icon fontSize='1.125rem' icon={'tabler:user-plus'} />
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
