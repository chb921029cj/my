import axios from 'axios';
var qs = require('qs');
axios.defaults.baseURL = 'http://localhost:8082';
// axios.defaults.baseURL = 'http://47.88.171.117:8082';

//credit 获取风控菜单
export function httpGetCreditMenuList() {
  return axios({
    url: "creditMenu/list",
    method: "get"
  })
}

//风控后台 / credit 风险趋势 上部四个方块
export function httpGetSummary() {
  //console.log(data);
  return axios({
    url: "/sys/summary",
    method: "get",
  })
}

//风控后台 / credit 风险趋势 下部下拉框展示
export function httpGetComboBox() {
  //console.log(data);
  return axios({
    url: "/sys/getcombobox",
    method: "get",
  })
}

//风控后台 / credit 风险趋势 按时间类型查找
export function httpGetSummaryBydateandType(begaindate, enddate, type) {
  let data = {
    begaindate,
    enddate,
    type
  };
  //console.log(data);
  return axios({
    url: "/sys/summarybydateandtype",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 报表统计 风险结果展示
export function httpGetCreditResultByuser(npage, pagesize, phoneNume, begain, end) {
  let data = {
    npage,
    pagesize,
    phoneNume,
    begain,
    end
  };
  //console.log(data);
  return axios({
    url: "/sys/getcreditresultbyuser",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 报表统计 风险结果统计 结果按钮点击展示
export function httpGetRiskpoint(id) {
  //console.log(data);
  return axios({
    url: "/sys/getriskpoint",
    method: "get",
    params: { //请求参数  
      id: id
    }
  })
}

//风控后台 / credit 信用报告
export function httpGetCreditReport(npage, pagesize, startDate, EndDate, phonenume, interfaceCallType) {
  let data = {
    npage,
    pagesize,
    startDate,
    EndDate,
    phonenume,
    interfaceCallType
  };
  //console.log(data);
  return axios({
    url: "/sys/getCreditReport",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 信贷报告
export function httpGetList(id) {
  let data = {
    id
  };
  //console.log(data);
  return axios({
    url: "rep/getlist",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 财务管理 消费明细）
export function httpGetConsumeDetail(npage, pagesize) {
  let data = {
    npage,
    pagesize,
  };
  //console.log(data);
  return axios({
    url: "/sys/consume_detail",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//credit 获取风控菜单
export function httpGetMoneyNow() {
  return axios({
    url: "/sys/getmoneynow",
    method: "get"
  })
}

//风控后台 / credit 财务管理 客户消费详情 列表展示
export function httpGetAllCus(npage, pagesize) {
  let data = {
    npage,
    pagesize,
  };
  //console.log(data);
  return axios({
    url: "/sys/getallcus",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 财务管理 客户消费详情 图表展示（按照月份）
export function httpGetChartInfobyMonth(type) {
  let data = {
    type
  };
  //console.log(data);
  return axios({
    url: "/sys/getchartinfobymonth",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//风控后台 / credit 财务管理 客户消费详情 图表展示（按照日期）
export function httpGetChartInfobyDate(date) {
  let data = {
    date
  };
  //console.log(data);
  return axios({
    url: "/sys/getchartinfobydate",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//credit 风控配置管理 执行器激活/停用
export function httpUpdateCreditStatus(
  id,
  status
) {
  const data = {
    id,
    status
  };

  return axios({
    url: "/sys/changstatus",
    method: "post",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  });
}


//credit 风控配置管理 执行器展示（新增 和复贷）
export function httpGetExecutor(npage, pagesize, type) {
  let data = {
      npage,
      pagesize,
      type
  };
  //console.log(data);
  return axios({
      url: "/sys/getexecutor",
      method: "post",
      headers: {
          'Content-type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data)
  })
}

//风控后台/信用报表统计风险结果展示credit 账户管理 基本资料展示
export function httpGetCustuserInfo() {
  //console.log(data);
  return axios({
      url: "/sys/getcustuserinfo",
      method: "get",
  })
}

//风控后台/信用报表统计风险结果展示credit 账户管理 基本资料展示
export function httpPostCustuserInfo(data) {
  //console.log(data);
  return axios({
      url: "/sys/updatecustuserinfo",
      method: "post",
      headers: {
          'Content-type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data)
  })
}