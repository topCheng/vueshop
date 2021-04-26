import config from "../../assets/js/conf/config"
import {request} from "../../assets/js/utils/request"

//商品评价
export function getReviewData(gid = "", page = 1) {
    return request(config.baseAPI + "/home/reviews/index?gid=" + gid + "&token=" + config.token + "&page=" + page)
}