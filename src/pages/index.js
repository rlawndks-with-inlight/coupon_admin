import LoginV1 from "./manager";

export default LoginV1;

// // ** React Imports
// import { useEffect, useState } from 'react'

// // ** Next Import
// import Link from 'next/link'
// // ** MUI Components
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
// import Checkbox from '@mui/material/Checkbox'
// import TextField from '@mui/material/TextField'
// import InputLabel from '@mui/material/InputLabel'
// import Typography from '@mui/material/Typography'
// import IconButton from '@mui/material/IconButton'
// import CardContent from '@mui/material/CardContent'
// import FormControl from '@mui/material/FormControl'
// import OutlinedInput from '@mui/material/OutlinedInput'
// import { styled, useTheme } from '@mui/material/styles'
// import MuiCard from '@mui/material/Card'
// import InputAdornment from '@mui/material/InputAdornment'
// import MuiFormControlLabel from '@mui/material/FormControlLabel'
// import axios from 'axios'
// import $ from 'jquery';
// import toast from 'react-hot-toast';
// import Spinner from 'src/@core/components/spinner'
// import CircularProgress from '@mui/material/CircularProgress'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** Configs
// import themeConfig from 'src/configs/themeConfig'

// // ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// // ** Demo Imports
// import { axiosIns } from 'src/@fake-db/backend'
// import { useRouter } from 'next/router'
// import { getCookie, setCookie } from 'src/@core/utils/react-cookie'
// import FallbackSpinner from 'src/@core/components/spinner'
// import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
// import { backUrl, LOCALSTORAGE } from 'src/data/data'
// import HeadContent from 'src/@core/components/head'
// import { processCatch } from 'src/@core/utils/function'
// import { themeObj } from 'src/@core/layouts/components/app/style-component'

// // ** Styled Components
// const Card = styled(MuiCard)(({ theme }) => ({
//   [theme.breakpoints.up('sm')]: { width: '25rem' }
// }))

// const LinkStyled = styled(Link)(({ theme }) => ({
//   fontSize: '0.875rem',
//   textDecoration: 'none',
//   color: theme.palette.primary.main
// }))

// const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
//   '& .MuiFormControlLabel-label': {
//     fontSize: '0.875rem',
//     color: theme.palette.text.secondary
//   }
// }))

// const SelectService = ({ dns_data }) => {
//   // ** State
//   const [values, setValues] = useState({
//     id: '',
//     password: '',
//     showPassword: false,
//     brand_id: 0
//   })
//   const [dnsData, setDnsData] = useState({})
//   const [loading, setLoading] = useState(false);

//   // ** Hook
//   const theme = useTheme();
//   const router = useRouter();
//   useEffect(() => {
//     settings();
//   }, [])

//   const settings = async () => {
//     setLoading(true);
//     await checkDns();
//     setLoading(false);
//   }


//   const checkDns = async () => {
//     try {
//       let obj = {};
//       let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
//       obj = JSON.parse(dns_data);

//       const response = await axiosIns().get(`/api/v1/auth/domain?dns=${location.hostname}`);
//       obj = { ...response?.data };
//       obj['theme_css'] = JSON.parse(obj['theme_css'] ?? "{}");
//       obj['options'] = JSON.parse(obj['options'] ?? "{}");
//       console.log(obj)
//       setDnsData(obj);
//       setValues({ ...values, ['brand_id']: obj.id });

//     } catch (err) {
//       console.log(err);
//       toast.error(err?.response?.data?.message || err?.message);
//       if (err?.response?.status == 409) {
//         router.push('/404');
//       }
//     }

//   }
//   const handleChange = prop => event => {
//     setValues({ ...values, [prop]: event.target.value })
//   }

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword })
//   }

//   return (
//     <>
//       {loading ?
//         <>
//         </>
//         :
//         <>
//           <Box className='content-center'>
//             {/* <AuthIllustrationV1Wrapper> */}
//             <Card style={{ boxShadow: 'none' }}>
//               <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
//                 <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                   <img src={dnsData?.logo_img} style={{ maxWidth: '256px' }} />
//                   <Typography sx={{ ml: 2.5, fontWeight: 600, fontSize: '1.625rem', lineHeight: 1.385 }}>
//                     {themeConfig.templateName}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ mb: 6 }}>
//                   <Typography variant='h6' sx={{ mb: 1.5 }}>
//                     {`Welcome ${themeConfig.templateName}! 👋🏻`}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ mb: 6 }}>
//                   <Typography variant='h6' sx={{ mb: 1.5, fontSize: themeObj.font_size.font3 }}>
//                     {dnsData?.og_description}
//                   </Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     mb: '1rem',
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     alignItems: 'center',
//                     justifyContent: 'space-between'
//                   }}
//                 >
//                   {/* <FormControlLabel control={<Checkbox />} label='로그인 상태 유지' />
//               <LinkStyled href='/pages/auth/forgot-password-v1'>비밀번호 찾기</LinkStyled> */}
//                 </Box>

//                 {/* <Button fullWidth size='large' type='submit' variant='contained' style={{ cursor: `${!loading ? 'pointer' : 'default'}`, background: themeObj.green }} sx={{ mb: 4 }} onClick={() => {
//                   if (!loading) {
//                     router.push('/app')
//                   }
//                 }}>
//                   {loading ?
//                     <>
//                       Loading...
//                     </>
//                     :
//                     <>
//                       멤버십 페이지 이동
//                     </>}
//                 </Button> */}
//                 {/* <Button fullWidth size='large' type='submit' variant='contained' style={{ cursor: `${!loading ? 'pointer' : 'default'}`, background: themeObj.yellow }} sx={{ mb: 4 }} onClick={() => {
//                   if (!loading) {
//                     router.push('/shop')
//                   }
//                 }}>
//                   {loading ?
//                     <>
//                       Loading...
//                     </>
//                     :
//                     <>
//                       쇼핑몰 이동
//                     </>}
//                 </Button> */}
//                 {/* <Button fullWidth size='large' type='submit' variant='contained' style={{ cursor: `${!loading ? 'pointer' : 'default'}` }} sx={{ mb: 4 }} onClick={() => {
//                   if (!loading) {
//                     router.push('/manager')
//                   }
//                 }}>
//                   {loading ?
//                     <>
//                       Loading...
//                     </>
//                     :
//                     <>
//                       관리자 페이지 이동
//                     </>}
//                 </Button> */}
//                 {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
//                 <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
//                 <Typography>
//                   <LinkStyled href='/pages/auth/register-v1' sx={{ fontSize: '1rem' }}>
//                     Create an account
//                   </LinkStyled>
//                 </Typography>
//               </Box> */}
//                 {/* <Divider
//                 sx={{
//                   fontSize: '0.875rem',
//                   color: 'text.disabled',
//                   '& .MuiDivider-wrapper': { px: 6 },
//                   my: theme => `${theme.spacing(6)} !important`
//                 }}
//               >
//                 or
//               </Divider> */}
//                 {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
//                   <Icon icon='mdi:facebook' />
//                 </IconButton>
//                 <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
//                   <Icon icon='mdi:twitter' />
//                 </IconButton>
//                 <IconButton
//                   href='/'
//                   component={Link}
//                   onClick={e => e.preventDefault()}
//                   sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
//                 >
//                   <Icon icon='mdi:github' />
//                 </IconButton>
//                 <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
//                   <Icon icon='mdi:google' />
//                 </IconButton>
//               </Box> */}
//               </CardContent>
//             </Card>
//             {/* </AuthIllustrationV1Wrapper> */}
//           </Box>
//         </>}

//     </>
//   )
// }


// SelectService.getLayout = page => <BlankLayout>{page}</BlankLayout>

// export default SelectService
