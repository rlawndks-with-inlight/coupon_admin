import { useRouter } from "next/router";
import { useEffect, useState, forwardRef } from "react";
import { getCookie } from "src/@core/utils/react-cookie";
import axiosIns from "src/@fake-db/backend";

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Pagination from '@mui/material/Pagination'

import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import Box from '@mui/material/Box'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { makeMaxPage, objToQuery } from "src/@core/utils/function";
import TableBasic from "src/views/table/data-grid/TableBasic";
import TableManager from "src/views/manager/table/TableManager";
import { Divider } from "@mui/material";
import $ from "jquery";
import { toast } from "react-hot-toast";
import FallbackSpinner from "src/@core/components/spinner";
import { objDataGridColumns } from "src/data/manager-data";
import DialogAlert from "src/views/components/dialogs/DialogAlert";

const List = () => {
  const router = useRouter();
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [posts, setPosts] = useState([]);
  const [maxPage, setMaxPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

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
    if (!Object.keys(objDataGridColumns).includes(router.query.table)) {
      router.back();
    }
    setParams(router?.query);
    let is_not_need_call_list = ['users', 'points'];
    if (!is_not_need_call_list.includes(router.query?.table)) {
      changePage(1, true);
    }
  }, [router?.query])

  const handleChange = async (field, value) => {
    setSearchObj({ ...searchObj, [field]: value });

    return { ...searchObj, [field]: value };
  }

  const changePage = async (num, is_first, insert_search_obj) => {
    try {
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

      const response = await axiosIns.get(`/api/v1/manager/${objDataGridColumns[router.query?.table]?.table}${query_str}`, {
        headers: {
          "Authorization": `Bearer ${getCookie('o')}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });
      console.log(response)
      let max_page = await makeMaxPage(response?.data?.total, response?.data?.page_size);

      setPage(parseInt(response?.data?.page));
      setPageSize(response?.data?.page_size);
      setMaxPage(max_page);
      setTotalCount(response?.data?.total);
      setPosts(response?.data?.content ?? []);
      setLoading(false);

    } catch (err) {
      setPosts([]);
      if (err?.response?.status == 401) {
        router.push('/manager/login')
      }
      toast.error(err?.response?.data?.message || err?.message);
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader defaultSearchObj={defaultSearchObj} loading={loading} page={page} changePage={changePage} handleChange={handleChange} searchObj={searchObj} setSearchObj={setSearchObj} />
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
              <div style={{ color: 'rgba(51, 48, 60, 0.38)', fontSize: '.875rem' }}>
                총 {totalCount}개 항목 중 {pageSize * (page - 1) + 1} ~ {pageSize * (page)}개 표시
              </div>
              <Pagination
                count={maxPage}
                page={page}
                variant='outlined' shape='rounded'
                color='primary'
                onChange={(_, num) => {
                  changePage(num)
                }} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default List;
