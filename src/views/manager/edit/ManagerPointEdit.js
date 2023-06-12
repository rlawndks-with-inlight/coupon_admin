import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { axiosIns } from 'src/@fake-db/backend'
import DatePicker from 'react-datepicker'
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { returnMoment } from 'src/@core/utils/function'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Autocomplete } from '@mui/material'
import _ from 'lodash'

const ManagerPointEdit = (props) => {
  const { getItem, editItem, popperPlacement } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [mchtList, setMchtList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [pubDt, setPubDt] = useState(new Date())

  const [values, setValues] = useState({
    phone_num: '',
    mcht_id: mchtList[0]?.id,
    purchase_price: 0,
    use_amount: 0,
    point_rate: 0,
    created_at: returnMoment(false, new Date()),
    is_cancel: 0
  })
  useEffect(() => {
    if (mchtList.length > 0) {
      if (router.query?.edit_category == 'edit') {
        if (values?.phone_num) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, [mchtList, values]);
  useEffect(() => {
    settingPage();
    //getOneItem();
  }, [])

  const settingPage = async () => {
    try {
      setLoading(true);
      const response = await axiosIns().get(`/api/v1/manager/utils/users?user=1&mcht=1`);
      setMchtList(_.sortBy(response?.data?.mcht_id, 'user_name'));
      if (response?.data?.mcht_id.length <= 0) {
        toast.error("가맹점부터 등록하셔야 장비를 추가하실 수 있습니다.");
        router.back();
      }
      setUserList(response?.data?.user_id?.normals);
      let item = await getItem();
      if (item) {
        let obj = {};
        for (var i = 0; i < Object.keys(values).length; i++) {
          let key = Object.keys(values)[i];
          obj[key] = item[key];
        }
        setValues({ ...obj });
      } else {
        setValues({ ...values, 'mcht_id': _.sortBy(response?.data?.mcht_id, 'user_name')[0]?.id });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const getOneItem = async () => {
  //   let item = await getItem();
  //   if (item) {
  //     let obj = {};
  //     for (var i = 0; i < Object.keys(values).length; i++) {
  //       let key = Object.keys(values)[i];
  //       obj[key] = item[key];
  //     }
  //     setValues({ ...obj });
  //   }
  // }

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChange = async (field, value) => {
    setValues({ ...values, [field]: value });
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const onReset = () => {
    setValues({
      phone_num: '',
      mcht_id: mchtList[0]?.id,
      purchase_price: 0,
      use_amount: 0,
      point_rate: 0,
      created_at: returnMoment(false, new Date()),
      is_cancel: 0
    })
    setPubDt(new Date());
  }

  const onSaveItem = async (obj_) => {
    let obj = obj_;

    let user_idx = userList.map(item => {
      return item?.phone_num
    }).findIndex((e) => e == values?.phone_num);
    if (user_idx < 0) {
      toast.error('유저아이디를 찾을 수 없습니다.');
      return;
    } else {
      obj['user_id'] = userList[user_idx]?.id;
      delete obj['phone_num'];
    }
    editItem(obj);
  }

  return (
    <>
      {loading ?
        <>
        </>
        :
        <>
          <Card>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='유저아이디(전화번호)' placeholder='유저아이디를 입력해 주세요.' className='phone_num' onChange={handleChangeValue('phone_num')} defaultValue={values?.phone_num} value={values?.phone_num} />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>가맹점명</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='mcht_id'
                      onChange={(e) => {
                        for (var i = 0; i < mchtList.length; i++) {
                          if (e.target.value == mchtList[i].id) {
                            setValues({ ...values, mcht_id: e.target.value, point_rate: mchtList[i].point_rate });
                            return;
                          }
                        }
                      }}
                      defaultValue={values?.mcht_id ?? 0}
                      value={values?.mcht_id}
                    >
                      {mchtList && mchtList.map((item, idx) => {
                        return <MenuItem value={item?.id} key={idx}>{item?.user_name}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                  <Autocomplete
                    id="mcht_id"
                    defaultValue={_.find(mchtList, { id: values?.mcht_id })?.user_name ?? ""}
                    onChange={(e, value) => {
                      let item = _.find(mchtList, { user_name: value });
                      setValues({ ...values, mcht_id: item?.id, point_rate: item?.point_rate });
                    }}
                    options={mchtList && mchtList.map((option) => option.user_name)}
                    renderInput={(params) => <TextField {...params} label="가맹점명" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='결제금액' placeholder='결제금액을 입력해 주세요.' className='name' onChange={handleChangeValue('purchase_price')} defaultValue={values?.purchase_price} value={values?.purchase_price} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='사용포인트' placeholder='사용포인트를 입력해 주세요.' className='use_amount' onChange={handleChangeValue('use_amount')} defaultValue={values?.use_amount} value={values?.use_amount} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='포인트 변환률' placeholder='포인트 변환률을 입력해 주세요.' className='name' onChange={handleChangeValue('point_rate')} defaultValue={values?.point_rate} value={values?.point_rate} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>사용 타입</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='is_cancel'
                      onChange={handleChangeValue('is_cancel')}
                      defaultValue={values?.is_cancel ?? 0}
                      value={values?.is_cancel}
                    >
                      <MenuItem value={0} >{'적립'}</MenuItem>
                      <MenuItem value={1} >{'적립취소'}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={15}
                    selected={pubDt}
                    id='date-time-picker'
                    dateFormat='yyyy-MM-dd h:mm aa'
                    popperPlacement={popperPlacement}
                    onChange={async (date) => {
                      try {
                        setPubDt(date);
                        handleChange('created_at', returnMoment(false, date));
                      } catch (err) {
                        console.log(err);
                      }

                    }}
                    customInput={<CustomInput label='발행시간' />}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '24px' }}>
            <CardContent>
              <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => {
                onSaveItem({ ...values })
              }}>
                저장
              </Button>
              <Button type='reset' variant='outlined' color='secondary' onClick={onReset}>
                리셋
              </Button>
            </CardContent>
          </Card>
        </>
      }

    </>
  )
}
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];
export default ManagerPointEdit;

