import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "src/@core/utils/react-cookie";
import { axiosIns } from "src/@fake-db/backend";

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Pagination from '@mui/material/Pagination'

import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import Box from '@mui/material/Box'


// ** Styled Components
import { excelDownload, makeMaxPage, objToQuery, processCatch } from "src/@core/utils/function";
import TableManager from "src/views/manager/table/TableManager";
import { Divider } from "@mui/material";
import FallbackSpinner from "src/@core/components/spinner";
import { objDataGridColumns } from "src/data/manager-data";
import { useTheme } from "@emotion/react";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE } from "src/data/data";
const List = ({ dns_data }) => {
  const router = useRouter();
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [posts, setPosts] = useState([]);
  const [maxPage, setMaxPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const page_size_list = [10, 20, 25, 50, 100];
  const [notSearchOption, setNotSearchOption] = useState({});
  const [userData, setUserData] = useState({});
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const defaultSearchObj = {
    page: 1,
    page_size: 10,
    search: ''
  }

  const [searchObj, setSearchObj] = useState({
    page: 1,
    page_size: 10,
    search: ''
  });

  useEffect(() => {
    // if (!Object.keys(objDataGridColumns).includes(router.query?.table)) {
    //   router.back();
    // }
    getUserData();
    setParams(router?.query);
  }, [router?.query?.table]);
  const getUserData = async () => {
    let user_data = await getLocalStorage(LOCALSTORAGE.USER_DATA);
    user_data = JSON.parse(user_data);
    setUserData(user_data);
  }
  const changeNotSearchOption = async () => {
    setLoading(true);
    let not_search_options = await getLocalStorage(LOCALSTORAGE.NOT_SEARCH_OPTION);
    not_search_options = JSON.parse(not_search_options) ?? {};
    not_search_options = not_search_options[router.query?.table] ?? [];
    let head_columns = [];
    if (objDataGridColumns[router.query?.table]?.head_columns) {
      for (var i = 0; i < objDataGridColumns[router.query?.table]?.head_columns.length; i++) {
        head_columns.push(0);
      }
    }

    for (var i = 0; i < not_search_options.length; i++) {
      let idx = objDataGridColumns[router.query?.table].columns.findIndex((e) => e.column == not_search_options[i]);
      if (objDataGridColumns[router.query?.table]?.head_columns) {
        let head_size = 0;
        for (var j = 0; j < objDataGridColumns[router.query?.table].head_columns.length; j++) {
          head_size += objDataGridColumns[router.query?.table].head_columns[j]?.size ?? 0;
          if (head_size > idx) {
            head_columns[j]++;
            break;
          }
        }
      }

    }
    not_search_options = {
      list: not_search_options,
      head_columns: head_columns
    }
    setNotSearchOption(not_search_options);
    setLoading(false);
  }
  const handleChange = async (field, value) => {
    setSearchObj({ ...searchObj, [field]: value });

    return { ...searchObj, [field]: value };
  }

  const changePage = async (num, is_first, insert_search_obj) => {
    try {
      if (!objDataGridColumns[router.query?.table]) {
        return;
      }
      setLoading(true);
      setPage(num);
      let search_obj = { ...searchObj, page: num };
      if (is_first) {//페이지 입장시
        search_obj = {
          page: 1,
          page_size: 10,
          search: '',
          ...objDataGridColumns[router.query?.table]?.default_search_obj
        };
      }
      if (insert_search_obj) {//바로 검색시
        search_obj = { ...insert_search_obj, page: num };
      }
      setSearchObj({ ...search_obj });
      let query_str = await objToQuery(search_obj);

      const response = await axiosIns().get(`/api/v1/manager/${objDataGridColumns[router.query?.table]?.table}${query_str}`, {
        headers: {
          "Authorization": `Bearer ${getCookie('o')}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });
      let max_page = await makeMaxPage(response?.data?.total, response?.data?.page_size);

      setPage(parseInt(response?.data?.page));
      setPageSize(response?.data?.page_size);
      setMaxPage(max_page);
      setTotalCount(response?.data?.total);
      setPosts(response?.data?.content ?? []);
      changeNotSearchOption();
      setLoading(false);
    } catch (err) {
      let push_lick = await processCatch(err);
      if (push_lick == -1) {
        router.back();
      } else {
        if (push_lick) {
          router.push(push_lick);
        }
      }
    }
  }

  const exportExcel = async () => {
    let obj = { ...searchObj, page_size: 1000000 };
    let query_str = await objToQuery(obj);

    const response = await axiosIns().get(`/api/v1/manager/${objDataGridColumns[router.query?.table]?.table}${query_str}`, {
      headers: {
        "Authorization": `Bearer ${getCookie('o')}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    });
    await excelDownload(response?.data?.content ?? [], objDataGridColumns, router.query?.table);
  }

  const onlyTeamSeeColumn = {
    // devices: ['brand_name', 'brand_id'],
    //users: ['brand_name'],
  }
  return (
    <>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              defaultSearchObj={defaultSearchObj}
              loading={loading}
              page={page}
              changePage={changePage}
              handleChange={handleChange}
              searchObj={searchObj}
              setSearchObj={setSearchObj}
              page_size_list={page_size_list}
              exportExcel={exportExcel}
              popperPlacement={popperPlacement}
              changeNotSearchOption={changeNotSearchOption}
              notSearchOption={notSearchOption}
              userData={userData}
              onlyTeamSeeColumn={onlyTeamSeeColumn}
            />
            <Divider sx={{ m: '0 !important' }} />
            {loading ?
              <>
                <FallbackSpinner sx={{ height: '300px' }} />
              </>
              :
              <>
                <TableManager
                  param_table={router.query?.table}//uri 에 사용할 것
                  table={objDataGridColumns[router.query?.table]?.table}//ajax에 사용할 것
                  searchObj={searchObj}
                  posts={posts}
                  columns={objDataGridColumns[router.query?.table]?.columns}
                  changePage={changePage}
                  page={page}
                  notSearchOption={notSearchOption}
                  userData={userData}
                  onlyTeamSeeColumn={onlyTeamSeeColumn}
                />
              </>}
            <Box
              sx={{
                p: 5,
                pb: 3,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px'
              }}
            >
              <div style={{ color: `${theme.palette.mode == 'dark' ? '#fff' : 'rgba(51, 48, 60, 0.38)'}`, fontSize: '.875rem' }}>
                총 {totalCount}개 항목 중 {pageSize * (page - 1) + 1} ~ {totalCount <= (pageSize * (page)) ? totalCount : (pageSize * (page))}개 표시
              </div>
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}>
                {/* <FormControl sx={{ mr: 4 }}>
                  <InputLabel id='demo-simple-select-outlined-label'></InputLabel>
                  <Select
                    size='small'
                    label=''
                    sx={{ width: '72px' }}
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
                </FormControl> */}
                <Pagination
                  count={maxPage}
                  page={page}
                  variant='outlined' shape='rounded'
                  color='primary'
                  onChange={(_, num) => {
                    changePage(num)
                  }} />
                {/* <TablePagination
                  rowsPerPageOptions={page_size_list}
                  component='div'
                  count={totalCount}
                  rowsPerPage={pageSize}
                  page={page - 1}
                  onPageChange={(
                    event,
                    newPage
                  ) => {
                    changePage(newPage + 1)
                  }}
                  onRowsPerPageChange={async (event) => {
                    let obj = await handleChange('page_size', event.target.value);
                    changePage(1, false, obj);
                  }}
                /> */}
              </Box>

            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default List;
