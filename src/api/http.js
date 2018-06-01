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