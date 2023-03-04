// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { excelUploadTableObj, objDataGridColumns } from 'src/data/manager-data'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import Icon from 'src/@core/components/icon'
import DatePicker from 'react-datepicker'
import UserOptionBox from './option-box/UserOptionBox'
import PointOptionBox from './option-box/PointOptionBox'
import DeviceOptionBox from './option-box/DeviceOptionBox'
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import $ from 'jquery';
import { returnMoment } from 'src/@core/utils/function'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DeviceSameDateLineBox from './same-date-line/DeviceSameDateLineBox'
import PointSameDateLineBox from './same-date-line/PointSameDateLineBox'
import OperatorSameDateLineBox from './same-date-line/OperatorSameDateLineBox'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import DialogSearchOption from 'src/views/components/dialogs/DialogSearchOption'
import { toast } from 'react-hot-toast'
import DialogExcelUpload from 'src/views/components/dialogs/DialogExcelUpload'

const optionBox = (param_table, changePage, page, searchObj, setSearchObj, handleChange, defaultSearchObj) => {

  if (param_table == 'points')
    return <PointOptionBox defaultSearchObj={defaultSearchObj} changePage={changePage} page={page} searchObj={searchObj} setSearchObj={setSearchObj} handleChange={handleChange} />
  else if (param_table == 'devices')
    return <DeviceOptionBox defaultSearchObj={defaultSearchObj} changePage={changePage} page={page} searchObj={searchObj} setSearchObj={setSearchObj} handleChange={handleChange} />

}

const sameDateLineBox = (common) => {
  // if (param_table == 'devices')
  //   return <DeviceSameDateLineBox defaultSearchObj={defaultSearchObj} changePage={changePage} page={page} searchObj={searchObj} setSearchObj={setSearchObj} handleChange={handleChange} />
  if (common.param_table == 'points')
    return <PointSameDateLineBox {...common} />
  else if (common.param_table == 'operators')
    return <OperatorSameDateLineBox {...common} />
}

const getOptionBoxBySameLineDate = (param_table,) => {
  let result = {
    value: {},
    tag: undefined
  }
  if (param_table == 'points') {
    result.value['is_cancel'] = -1;
  }
  if (param_table == 'operators') {
    result.value['level'] = -1;
  }

  return result;
}

const TableHeader = props => {
  // ** Props
  const { userData, changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj, page_size_list, exportExcel, popperPlacement, changeNotSearchOption, onlyTeamSeeColumn, loading } = props
  const [sDt, setSDt] = useState(new Date());
  const [eDt, setEDt] = useState(new Date());
  const [addSearchOption, setAddSearchOption] = useState({});
  const router = useRouter();
  const theme = useTheme()
  const { direction } = theme

  useEffect(() => {
    if ($('.manager-table-header > .css-x2in24-MuiInputBase-input-MuiOutlinedInput-input').offset()?.top) {
      $('.manager-table-header > .css-x2in24-MuiInputBase-input-MuiOutlinedInput-input').attr('style', 'padding: 8.5px 14px !important;');
    }
  }, [$('.manager-table-header > .css-x2in24-MuiInputBase-input-MuiOutlinedInput-input').offset()])
  useEffect(() => {
    settings();
  }, [router.query?.table])

  const settings = async () => {

    let date = new Date();
    let first_day = new Date(date.getFullYear(), date.getMonth(), 1);
    setSDt('')
    setEDt('')
    let today = returnMoment().substring(0, 10);
    let obj = {
      ...defaultSearchObj,
      //s_dt: returnMoment(false, first_day).substring(0, 10),
      //e_dt: today
    };
    let add_obj = await getOptionBoxBySameLineDate(router.query?.table);
    add_obj = add_obj?.value;
    obj = { ...obj, ...add_obj };
    let query_key_list = Object.keys(router.query);
    for (var i = 0; i < query_key_list.length; i++) {
      if (query_key_list != 'table') {
        obj[query_key_list[i]] = router.query[query_key_list[i]];
      }
    }
    await changePage(1, false, obj);

  }

  const setDateByButton = async (num) => {
    let s_dt = "";
    let e_dt = "";
    if (num == 1) {
      s_dt = returnMoment().substring(0, 10);
      e_dt = returnMoment().substring(0, 10);
    } else if (num == 0) {
      s_dt = returnMoment().substring(0, 10);
      e_dt = returnMoment().substring(0, 10);
    } else if (num == -1) {
      s_dt = returnMoment(-1).substring(0, 10);
      e_dt = returnMoment(-1).substring(0, 10);
    } else if (num == 3) {
      s_dt = returnMoment(-3).substring(0, 10);
      e_dt = returnMoment(-1).substring(0, 10);
    } else if (num == 30) {
      let moment = returnMoment().substring(0, 10);
      moment = moment.split('-');
      if (moment[1] == '01') {
        moment[1] = '12';
        moment[0] = moment[0] - 1;
      } else {
        moment[1] = moment[1] - 1;
      }
      s_dt = `${moment[0]}-${moment[1] >= 10 ? moment[1] : `0${moment[1]}`}-01`;
      e_dt = returnMoment(undefined, new Date(moment[0], moment[1], 0)).substring(0, 10);
    } else if (num == 90) {
      let moment = returnMoment().substring(0, 10);
      moment = moment.split('-');
      if (moment[1] == '01' || moment[1] == '02' || moment[1] == '03') {
        moment[1] = parseInt(moment[1]) + 9;
        moment[0] = moment[0] - 1;
      }
      s_dt = `${moment[0]}-${moment[1] >= 10 ? moment[1] : `0${moment[1]}`}-01`;

      let moment2 = returnMoment().substring(0, 10);
      moment2 = moment2.split('-');
      if (moment2[1] == '01') {
        moment2[1] = '12';
        moment2[0] = moment2[0] - 1;
      } else {
        moment2[1] = moment2[1] - 1;
      }
      e_dt = returnMoment(undefined, new Date(moment2[0], moment2[1], 0)).substring(0, 10);
    } else {
      return;
    }

    let obj = await handleChange('s_dt', s_dt);
    await handleChange('e_dt', s_dt);
    obj = { ...obj, ['e_dt']: e_dt };
    changePage(1, false, obj);
    setSDt(new Date(s_dt));
    setEDt(new Date(e_dt));
  }

  const getIsSeeAddButton = (param_table, user_data) => {
    if (param_table == 'operators') {
      if (user_data?.level == 50 || user_data?.level == 40) {
        return true;
      } else {
        return false;
      }
    }
    if (user_data?.level >= objDataGridColumns[param_table]?.is_see_add_condition) {
      return true;
    } else {
      return false;
    }
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openSearchOption = async () => {
    await handleClickOpen();
  }
  const saveSearchOption = async () => {
    let not_search_options = [];
    for (var i = 0; i < objDataGridColumns[router.query?.table].columns.length; i++) {
      if (!$(`input:checkbox[name=${objDataGridColumns[router.query?.table].columns[i]?.column}]`).is(":checked")) {
        not_search_options.push(objDataGridColumns[router.query?.table].columns[i]?.column);
      }
    }
    let not_search_option = await getLocalStorage(LOCALSTORAGE.NOT_SEARCH_OPTION);
    not_search_option = JSON.parse(not_search_option) ?? {};
    not_search_option[router.query?.table] = not_search_options;
    await setLocalStorage(LOCALSTORAGE.NOT_SEARCH_OPTION, not_search_option);
    handleClose();
    toast.success("성공적으로 저장 되었습니다.");
    changeNotSearchOption();
  }

  const [excelUploadOpen, setExcelUploadOpen] = useState(false);
  const handleClickExcelUploadOpen = () => setExcelUploadOpen(true);
  const handleExcelUploadClose = () => setExcelUploadOpen(false);
  const saveUploadExcel = () => {

  }
  return (
    <>
      <DialogSearchOption
        open={open}
        data={objDataGridColumns[router.query?.table]}
        setOpen={setOpen}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        saveSearchOption={saveSearchOption}
        param_table={router.query?.table}
        onlyTeamSeeColumn={onlyTeamSeeColumn}
      />
      {/* {optionBox(router.query?.table, changePage, page, searchObj, setSearchObj, handleChange, defaultSearchObj)} */}
      <DatePickerWrapper>
        <Box
          sx={{
            p: 5,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            rowGap: 2,
          }}
          className='manager-table-header'
        >
          <div style={{ marginRight: '1rem' }} >
            <DatePicker
              selected={sDt}
              dateFormat="yyyy-MM-dd"
              id='month-year-dropdown'
              popperPlacement={popperPlacement}
              style={{ padding: '8.5px 32px' }}

              onChange={async (date) => {
                try {
                  setSDt(date);
                  let obj = await handleChange('s_dt', returnMoment(false, date).substring(0, 10));
                  changePage(1, false, obj);
                } catch (err) {
                  console.log(err);
                }

              }}
              placeholderText='Click to select a date'
              customInput={<CustomInput label='검색시작일' ref={(el) => (isSeeRef.current[0] = el)} />}

            />
          </div>
          <div style={{ marginRight: '1rem' }}>
            <DatePicker
              selected={eDt}

              dateFormat="yyyy-MM-dd"
              popperPlacement={popperPlacement}
              onChange={async (date) => {
                setEDt(date);
                let obj = await handleChange('e_dt', returnMoment(false, date).substring(0, 10));
                changePage(1, false, obj);
              }}
              placeholderText='Click to select a date'
              customInput={<CustomInput label='검색종료일' ref={(el) => (isSeeRef.current[1] = el)} />}

            />
          </div>
          {sameDateLineBox({
            param_table: router.query?.table,
            changePage: changePage,
            page: page,
            searchObj: searchObj,
            setSearchObj: setSearchObj,
            handleChange: handleChange,
            defaultSearchObj: defaultSearchObj,
            userData: userData,
          })}
          {getOptionBoxBySameLineDate(router.query?.table)?.tag ?? ""}
          {/* <FormControl sx={{ mr: 4 }}>
          <InputLabel id='demo-simple-select-outlined-label'>발급타입</InputLabel>
          <Select
            size='small'
            label='발급타입'
            value={searchObj?.is_cancel}
            id='demo-simple-select-outlined'
            labelId='demo-simple-select-outlined-label'
            onChange={async (e) => {
              try {
                setLoading(true)
                let obj = await handleChange('is_cancel', e.target.value);
                changePage(page, false, obj);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            {pub_type_list && pub_type_list.map((item, idx) => {
              return <MenuItem key={idx} value={parseInt(item?.is_cancel)}>{item?.name}</MenuItem>
            }
            )}
          </Select>
        </FormControl> */}
        </Box>
        <Divider />
        <Box
          sx={{
            p: 5,
            pl: 3,
            pr: 3,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            rowGap: 2,
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', rowGap: 2, }}>
            <Button color='secondary' variant='outlined' sx={{ mr: 2, ml: 2 }} startIcon={<Icon icon='tabler:upload' />}
              onClick={exportExcel}>
              엑셀추출
            </Button>
            <Button type='submit' color='secondary' sx={{ mr: 2, ml: 2, flexGrow: 1 }} variant='outlined' onClick={() => { setDateByButton(0) }}>
              당일
            </Button>
            <Button type='submit' color='secondary' sx={{ mr: 2, ml: 2, flexGrow: 1 }} variant='outlined' onClick={() => { setDateByButton(-1) }}>
              어제
            </Button>
            <Button type='submit' color='secondary' sx={{ mr: 2, ml: 2, flexGrow: 1 }} variant='outlined' onClick={() => { setDateByButton(3) }}>
              3일전
            </Button>
            <Button type='submit' color='secondary' sx={{ mr: 2, ml: 2, flexGrow: 1 }} variant='outlined' onClick={() => { setDateByButton(30) }}>
              1개월
            </Button>
            <Button type='submit' color='secondary' sx={{ mr: 2, ml: 2, flexGrow: 1 }} variant='outlined' onClick={() => { setDateByButton(90) }}>
              3개월
            </Button>
            <Button type='submit' color='secondary' sx={{ mr: 2, ml: 2, flexGrow: 1 }} variant='outlined' onClick={openSearchOption}>
              검색옵션
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', rowGap: 2, }}>
            <FormControl sx={{ mr: 2, ml: 2, minWidth: '78px', flexGrow: 1 }} size='small'>
              <InputLabel id='demo-simple-select-outlined-label'></InputLabel>
              <Select
                label=''
                value={searchObj?.page_size}
                id='demo-simple-select-outlined'
                labelId='demo-simple-select-outlined-label'
                onChange={async (e) => {
                  let obj = await handleChange('page_size', e.target.value);
                  changePage(page, false, obj);
                }}
              >
                {page_size_list && page_size_list.map((item, idx) => {
                  return <MenuItem value={item} key={idx}>{item}</MenuItem>
                }
                )}
              </Select>
            </FormControl>
            <TextField
              size='small'
              sx={{ mr: 2, ml: 2, flexGrow: 1 }}
              onChange={e => handleChange('search', e.target.value)}
              defaultValue={searchObj?.search}
              value={searchObj?.search}
              onKeyPress={e => e.key == 'Enter' ? changePage(1) : console.log(null)}
              placeholder={`${objDataGridColumns[router.query?.table]?.search_placeholder ?? "검색명을 입력해 주세요."}`}
              className="search"
            />
            {(objDataGridColumns[router.query?.table]?.is_add && getIsSeeAddButton(router.query?.table, userData)) ?
              <>
                <Button sx={{ ml: 2, flexGrow: 1, mr: 2 }} component={Link} variant='contained' href={`/manager/${router.query?.table}/create`} startIcon={<Icon icon='tabler:plus' />}>
                  {objDataGridColumns[router.query?.table]?.breadcrumb} 추가
                </Button>
              </>
              :
              <>
              </>}
            {/* {(excelUploadTableObj[router.query?.table] && getIsSeeAddButton(router.query?.table, userData)) ?
              <>
                <Button sx={{ mb: 2, ml: 4 }} variant='contained' onClick={() => {
                  router.push({ pathname: '/manager/uploads/excel', query: { t: router.query?.table } })
                }} startIcon={<Icon icon='uiw:file-excel' />}>
                  {objDataGridColumns[router.query?.table]?.breadcrumb} 대량등록
                </Button>
              </>
              :
              <>
              </>} */}

          </Box>
        </Box>
      </DatePickerWrapper>
    </>
  )
}

export default TableHeader
