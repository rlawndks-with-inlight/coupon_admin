
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Divider } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useRouter } from 'next/router'
import { LOCALSTORAGE } from 'src/data/data'

const UserOptionBox = (props) => {
  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj } = props;
  const [userLevelList, setUserLevelList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    settings();
  }, [router.query])
  useEffect(() => {
    if (typeof searchObj?.level == 'number' && searchObj?.level >= 0) {
      setLoading(false);
    }
  }, [searchObj])

  const settings = async () => {
    setLoading(true);
    let user = await getLocalStorage(LOCALSTORAGE.USER_DATA);
    user = JSON.parse(user);

    let z_all_user = [
      { level: 50, name: '개발사' },
      { level: 40, name: '본사' },
      { level: 30, name: '지사' },
      { level: 20, name: '총판' },
      { level: 15, name: '대리점' },
      { level: 10, name: '가맹점' },
      { level: 0, name: '일반유저' },
    ];
    let user_level_list = [];
    for (var i = 0; i < z_all_user.length; i++) {
      if (z_all_user[i].level < user?.level) {
        user_level_list.push(z_all_user[i]);
      }
    }
    setUserLevelList(user_level_list);

    //let obj = { ...defaultSearchObj, level: user_level_list[0]?.level };
    //changePage(1, false, obj);
  }

  return (
    <>
      <Box
        sx={{
          p: 5,
          pb: 3,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {loading ?
          <>

          </>
          :
          <>

            <FormControl>
              <InputLabel id='demo-simple-select-outlined-label'>유저레벨</InputLabel>
              <Select
                size='small'
                label='유저레벨'
                value={searchObj?.level}
                id='demo-simple-select-outlined'
                labelId='demo-simple-select-outlined-label'
                onChange={async (e) => {
                  try {
                    setLoading(true)
                    let obj = await handleChange('level', e.target.value);
                    changePage(page, false, obj);
                  } catch (err) {
                    console.log(err);
                  }

                }}
              >
                {userLevelList && userLevelList.map((item, idx) => {
                  return <MenuItem key={idx} value={parseInt(item?.level)}>{item?.name}</MenuItem>
                }
                )}
              </Select>
            </FormControl>

          </>}
      </Box>
      <Divider />
    </>
  )
}

export default UserOptionBox;
