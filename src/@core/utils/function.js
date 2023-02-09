
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
