import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getItemByType } from "src/views/manager/table/TrManager";
import { objDataGridColumns } from "src/data/manager-data";
import { getLocalStorage } from "./local-storage";
import { LOCALSTORAGE } from "src/data/data";
import { t } from "i18next";

export const objToQuery = (obj_) => {
  let obj = { ...obj_ };
  let query = "";
  for (var i = 0; i < Object.keys(obj).length; i++) {
    if (i == 0) {
      query += '?';
    }
    query += `${Object.keys(obj)[i]}=${obj[Object.keys(obj)[i]]}&`;
  }

  return query;
}

export const makeMaxPage = (num, page_cut) => {
  if (num % page_cut == 0) {
    return num / page_cut;
  } else {
    return parseInt(num / page_cut) + 1;
  }
}

export const returnMoment = (num, date) => {//num 0: 오늘, num -1: 어제 , date->new Date() 인자로 받음
  try {
    var today = new Date();
    if (num) {
      let new_date = new Date(today.setDate(today.getDate() + num));
      today = new_date;
    }
    if (date) {
      today = date;
    }
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;
    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);
    var timeString = hours + ':' + minutes + ':' + seconds;
    let moment = dateString + ' ' + timeString;

    return moment;
  } catch (err) {
    console.log(err);

    return false;
  }

}

export const commarNumber = (num) => {
  if (num > 0 && num < 0.000001) {
    return "0.00";
  }
  if (!num && num != 0) {
    return undefined;
  }
  let str = "";
  if (typeof num == "string") {
    str = num;
  } else {
    str = num.toString();
  }
  let decimal = "";
  if (str.includes(".")) {
    decimal = "." + str.split(".")[1];
    str = str.split(".")[0];
  } else {
    decimal = "";
  }
  if (str?.length <= 3) {
    return str + decimal;
  }
  let result = "";
  let count = 0;
  for (var i = str?.length - 1; i >= 0; i--) {
    if (count % 3 == 0 && count != 0 && !isNaN(parseInt(str[i]))) result = "," + result;
    result = str[i] + result;
    count++;
  }

  return result + decimal;
}

export const getDomain = () => {
  let domain = window.location.hostname;

  return domain();
}

export const excelDownload = async (excelData, objDataGridColumns, param_table) => {
  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const excelFileName = param_table;
  let ignore_name_list = ['맨위로', '수정', '삭제', '관리'];
  let name_list = [];
  let column_list = [];
  for (var i = 0; i < objDataGridColumns[param_table].columns.length; i++) {
    if (!ignore_name_list.includes(objDataGridColumns[param_table].columns[i].name)) {
      name_list.push(objDataGridColumns[param_table].columns[i].title)
      column_list.push(objDataGridColumns[param_table].columns[i])
    }
  }
  let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
  dns_data = JSON.parse(dns_data);

  const ws = XLSX.utils.aoa_to_sheet([
    [dns_data?.name]
    , []
    , name_list
  ]);

  let result = [...excelData];
  let excel_list = [];
  for (var i = 0; i < result.length; i++) {
    excel_list[i] = [];
    for (var j = 0; j < column_list.length; j++) {
      let data = await getItemByType(result[i], column_list[j], param_table, undefined, undefined, true)
      await excel_list[i].push(data);
    }
  }
  await excel_list.map(async (data, idx) => {
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        data
      ],
      { origin: -1 }
    );
    ws['!cols'] = [
      { wpx: 50 },
      { wpx: 50 }
    ]

    return false;
  });
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const excelFile = new Blob([excelButter], { type: excelFileType });
  FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
}

export const useEditPageImg = (img_) => {
  try {
    let img = img_ ? img_[0] : '';
    if (typeof img == 'string') {
      img = '';
    }

    return img;
  } catch (err) {
    console.log(err);

    return '';
  }
}
