// ** React Imports
import { useEffect, useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
// ** MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { excelUploadTableObj } from 'src/data/manager-data'
import { Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import { useTheme } from '@emotion/react'
import * as XLSX from 'xlsx';
import $ from 'jquery';
import { processCatch, returnMoment } from 'src/@core/utils/function'
import { axiosIns } from 'src/@fake-db/backend'
import { useRouter } from 'next/router'
import DialogConfirm from 'src/views/components/dialogs/DialogConfirm'
import { toast } from 'react-hot-toast'
const Excel = (props) => {
  const { open, setOpen, handleClickOpen, handleClose, data, saveUploadExcel } = props;

  const theme = useTheme();
  const router = useRouter();
  const [tabValue, setTabValue] = useState("merchandises");
  const [count, setCount] = useState(0);
  const [isAbleAdd, setIsAbleAdd] = useState(false);
  const [rowObj, setRowObj] = useState({

  })
  const [errorObj, setErrorObj] = useState({});
  useEffect(() => {
    let obj = {};
    for (var i = 0; i < Object.keys(excelUploadTableObj).length; i++) {
      obj = { ...obj, [Object.keys(excelUploadTableObj)[i]]: [] };
    }
    setRowObj(obj);
    if (router?.query?.t) {
      setTabValue(router?.query?.t);
    }
  }, [])
  useEffect(() => {
    setIsAbleAdd(false);
    setRowObj({});
  }, [tabValue])

  function excelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  const uploadExcel = async (e) => {
    e.preventDefault();
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = async function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary' });
      let obj_key_list = Object.keys(excelUploadTableObj);
      let row_obj = {};
      let dataParseObj = {};
      let wsnameObj = {};
      let wsObj = {};
      for (var i = 0; i < obj_key_list.length; i++) {

        wsnameObj[obj_key_list[i]] = readedData.SheetNames[i];
        wsObj[obj_key_list[i]] = readedData.Sheets[wsnameObj[obj_key_list[i]]];
        dataParseObj[obj_key_list[i]] = XLSX.utils.sheet_to_json(wsObj[obj_key_list[i]], { header: 1 });
        dataParseObj[obj_key_list[i]].shift();
        for (var j = 0; j < dataParseObj[obj_key_list[i]].length; j++) {
          let is_null = true;
          let temp = dataParseObj[obj_key_list[i]][j];
          let arr_obj = {};
          for (var k = 0; k < excelUploadTableObj[obj_key_list[i]].columns.length; k++) {
            if (excelUploadTableObj[obj_key_list[i]].columns[k].type == 'text') {
              if (!temp[k]) {
                temp[k] = "";
              } else {
                is_null = false;
              }
              temp[k] = temp[k].toString();
            }
            if (excelUploadTableObj[obj_key_list[i]].columns[k].type == 'number') {
              temp[k] = parseFloat(temp[k]);
              if (isNaN(temp[k])) {
                temp[k] = "";
              } else {
                is_null = false;
              }
            }
            if (excelUploadTableObj[obj_key_list[i]].columns[k].type == 'date') {
              if (typeof temp[k] == 'number') {
                temp[k] = excelDateToJSDate(temp[k]);
              }
              temp[k] = returnMoment(false, new Date(temp[k])).substring(0, 10);
            }
            arr_obj[excelUploadTableObj[obj_key_list[i]].columns[k].column] = temp[k];
          }
          if (is_null) {
            break;
          }
          dataParseObj[obj_key_list[i]][j] = arr_obj;
        }

      }
      setRowObj(dataParseObj);
      try {
        const response = await axiosIns().post(`api/v1/manager/${tabValue}/stores-validate`,
          dataParseObj[tabValue]
        )
        if (response.status == 200) {
          setIsAbleAdd(true);
        }
      } catch (err) {
        console.log(err);
        setErrorObj(err?.response?.data?.data);
        let push_lick = await processCatch(err);
      }
    };

    reader.readAsBinaryString(f);
    $("#excel_upload").val("");
  }
  const handleChangeTabChange = (event, newValue) => {
    setTabValue(newValue)
  }
  const saveExcelValues = async () => {
    handleEditConfirmClose();
    try {
      const response = await axiosIns().post(`api/v1/manager/${tabValue}/stores`,
        rowObj[tabValue]
      )
      if (response.status == 201) {
        toast.success('성공적으로 저장 되었습니다.');
        setIsAbleAdd(false);
        setRowObj({});
      }
    } catch (err) {
      console.log(err);
      let push_lick = await processCatch(err);
    }

  }
  const [editConfirmOpen, setEditConfirmOpen] = useState(false);
  const handleEditConfirmClose = () => setEditConfirmOpen(false)
  const [editConfirmData, setEditConfirmData] = useState({});
  const onEditConfirmOpen = (obj) => {
    setEditConfirmOpen(true);
  }
  return (
    <>
      <DialogConfirm
        open={editConfirmOpen}
        handleClose={handleEditConfirmClose}
        onKeepGoing={saveExcelValues}
        text={`정말 추가 하시겠습니까?`}
        //subText={'삭제하시면 복구할 수 없습니다.'}
        headIcon={<Icon icon='tabler:edit' style={{ fontSize: '40px' }} />}
        saveText={'저장'}
        data={rowObj[tabValue]}
      />
      <Card>
        <CardContent>
          {count == 1 ?
            <>
              <IconButton
                aria-label='close'
                onClick={handleClose}
                sx={{ top: 8, right: 10, position: 'absolute', color: 'grey.500' }}
              >
                <Icon icon='tabler:x' />
              </IconButton>
            </>
            :
            <>
            </>}


          <TabContext value={tabValue}>
            <TabList centered onChange={handleChangeTabChange} aria-label='simple tabs example' variant='fullWidth'>
              {excelUploadTableObj && Object.keys(excelUploadTableObj).map((item) => {
                return <Tab value={item} label={excelUploadTableObj[item]?.breadcrumb} />
              })}
            </TabList>
            <Box sx={{ padding: '24px 24px 0 24px', display: 'flex', flexWrap: 'wrap' }}>
              <Box sx={{ mr: 10 }}>
                <Grid sx={{ color: 'red', fontWeight: 'bold', mb: 4, }}>사용방법</Grid>
                <Grid sx={{ fontSize: '15px', whiteSpace: 'pre' }}>1. 상단 컬럼에 존재하는 (O)와 (X)는 필수 값의 여부이며 (X)는 존재하지 않을 시 빈값으로 입력합니다.</Grid>
                <Grid sx={{ fontSize: '15px', whiteSpace: 'pre' }}>2. 가맹점 {'->'} 장비 {'->'} 유저 {'->'} 포인트 순서로 대량등록을 진행해야합니다.(이미 등록했을 시 무방함)</Grid>
                <Grid sx={{ fontSize: '15px', whiteSpace: 'pre' }}>3. 날짜 포멧은 Y-m-d을 준수해야합니다. (예: 1970-01-02)</Grid>
                <Grid sx={{ fontSize: '15px', whiteSpace: 'pre', paddingBottom: '24px' }}>4. 대량등록은 사이트내 각각의 추가기능을 기반으로 제작되었습니다.</Grid>
              </Box>
              <Box>
                <Grid sx={{ color: 'red', fontWeight: 'bold', mb: 4 }}>{excelUploadTableObj[tabValue]?.breadcrumb} 등록 주의사항</Grid>
                {excelUploadTableObj[tabValue].caution && excelUploadTableObj[tabValue].caution.map((item, idx) => {
                  return <Grid sx={{ fontSize: '15px', whiteSpace: 'pre', paddingBottom: `${excelUploadTableObj[tabValue].caution.length - 1 == idx ? '24px' : '0'}` }}>{idx + 1}. {item}</Grid>
                })}
              </Box>
            </Box>
            <Grid sx={{ display: 'flex', padding: '0 24px', justifyContent: 'space-between' }}>
              <Grid sx={{ display: 'flex' }}>
                <label htmlFor={'excel_upload'}>
                  <Button variant='contained' component="span" startIcon={<Icon icon='uiw:file-excel' />} >
                    파일등록
                  </Button>
                </label>
                <input type={'file'} onChange={uploadExcel} id='excel_upload' style={{ display: 'none' }} />
                <Button sx={{ mb: 2, ml: 2 }} href={"/file/정보 대량등록 양식_v1_2023-03-03.xlsx"} download={true} variant='contained' startIcon={<Icon icon='uiw:file-excel' />}>
                  양식추출
                </Button>
              </Grid>
              {isAbleAdd ?
                <>
                  <Button variant='contained' startIcon={<Icon icon='tabler:plus' />} onClick={onEditConfirmOpen}>
                    추가
                  </Button>
                </>
                :
                <>
                  <div />
                </>}
            </Grid>
            {excelUploadTableObj && Object.keys(excelUploadTableObj).map((item) => {
              return (<TabPanel value={item}>
                <Typography>
                  <TableContainer className={`table-container${theme.palette.mode == 'dark' ? '-dark' : ''}`} component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{
                            borderTop: 'none',
                            backgroundColor: `${theme.palette.mode == 'dark' ? 'rgb(74, 80, 114)' : 'rgb(246, 246, 247)'}`,
                          }}>
                          {excelUploadTableObj[item] && excelUploadTableObj[item].columns.map((item, idx) => {
                            return (<TableCell sx={{ maxWidth: '300px', position: 'relative' }}>
                              <div style={{
                                position: 'absolute',
                                width: '2px',
                                height: '100%',
                                display: 'flex',
                                left: '0',
                                top: '0'
                              }}>
                                <div style={{
                                  width: '2px',
                                  height: '14px',
                                  margin: 'auto 0',
                                  background: `${idx != 0 ? `${theme.palette.mode == 'dark' ? '#5d6282' : '#dedee0'}` : ''}`,
                                }} />
                              </div>
                              {item.name}
                            </TableCell>)
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowObj[tabValue] && rowObj[tabValue].map((row, index) => {
                          return (<TableRow>
                            {excelUploadTableObj[item] && excelUploadTableObj[item].columns.map((column, idx) => {
                              let color = "";
                              console.log(errorObj)
                              if (errorObj[`${column?.column}`] && errorObj[`${column?.column}`].includes(index)) {
                                color = 'red !important';
                              }
                              return <TableCell sx={{ maxWidth: '300px', color: color }}>{row[column.column]}</TableCell>
                            })}
                          </TableRow>)
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Typography>
              </TabPanel>)
            })}
          </TabContext>


        </CardContent>
      </Card>
    </>
  )
}

export default Excel
