import config from "../../assets/js/conf/config.js"
import {request} from "../../assets/js/utils/request.js"

//产品分类页面左侧菜单
export function getClassifyData() {
    return request(config.baseAPI + "/home/category/menu?token=" + config.token);
}

//产品分类右侧商品
export function getGoodsData(cid = "") {
    return request(config.baseAPI + "/home/category/show?cid=" + cid + "&token=" + config.token)
}

//商品详情页面
export function getGoodsDetailsData(gid = "") {
    return request(config.baseAPI + "/home/goods/info?gid=" + gid + "&type=details&token=" + config.token);
}

//商品规格
export function getGoodsAttrsData(gid = "") {
    return request(config.baseAPI + "/home/goods/info?gid=" + gid + "&type=spec&token=" + config.token);
}

//加入收藏
export function addCollectionData(data) {
    return request(config.baseAPI + "/goods/fav?uid=" + data.uid + "&gid=" + data.gid + "&token=" + config.token);
}