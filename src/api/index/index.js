import config from "../../assets/js/conf/config.js"
import {request} from "../../assets/js/utils/request.js"
//首页幻灯片
export function getSwiperData() {
    return request(config.baseAPI + "/home/index/slide?token="+config.token);
}
//首页导航
export function getNavsData() {
    return request(config.baseAPI + "/home/index/nav?token="+config.token);
}
//首页产品
export function getGoodsData() {
    return request(config.baseAPI + "/home/index/goodsLevel?token="+config.token);
}
//首页推荐
export function getRecomGoodsData() {
    return request(config.baseAPI + "/home/index/recom?token="+config.token);
}