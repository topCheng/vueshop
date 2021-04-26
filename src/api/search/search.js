import config from "../../assets/js/conf/config"
import {request} from "../../assets/js/utils/request"

//热门搜索关键词
export function getHotwordsData() {
    return request(config.baseAPI + "/home/public/hotwords?token=" + config.token);
}

//产品搜索结果
export function getSearchData(data) {
    let kwords = data.keyword ? data.keyword : "";
    let page = data.page ? data.page : "1";
    let otype = data.otype ? data.otype : "all";
    let cid = data.cid ? data.cid : "";
    let price1 = data.price1 ? data.price1 : "";
    let price2 = data.price2 ? data.price2 : "";
    //console.log(data.param)
    let param = data.param && data.param !== "[]" ? data.param : "";
    let url = config.baseAPI + "/home/goods/search?kwords=" + kwords + "&param=" + param + "&page=" + page + "&price1=" + price1 + "&price2=" + price2 + "&otype=" + otype + "&cid=" + cid + "&token=" + config.token;
    console.log(url)
    return request(url);
}

//产品搜索页面属性参数
export function getAttrsData(keyword) {
    return request(config.baseAPI + "/home/goods/param?kwords=" + keyword + "&token=" + config.token);
}