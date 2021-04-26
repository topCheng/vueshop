import config from "../../assets/js/conf/config"
import {request} from "../../assets/js/utils/request"

export function addOrderData(data) {//提交订单
    return request(config.baseAPI + "/order/add?token=" + config.token, "post", data);
}

export function getOrderNumberData(uid) {//获取最后订单编号
    return request(config.baseAPI + "/order/lastordernum?uid=" + uid + "&token=" + config.token);
}

export function myOrderData(data) {//我的订单
    return request(config.baseAPI + "/user/myorder/index?uid=" + data.uid + "&status=" + data.status + "&token=" + config.token + "&page=" + data.page);
}

export function cancelOrderData(data) {//取消订单
    return request(config.baseAPI + "/user/myorder/clearorder?uid=" + data.uid + "&ordernum=" + data.ordernum + "&token=" + config.token);
}

export function confirmOrderData(data) {//确认收货(订单)
    return request(config.baseAPI + "/user/myorder/finalorder?uid=" + data.uid + "&ordernum=" + data.ordernum + "&token=" + config.token);
}

export function orderDetailsData(data) {//会员订单详情
    return request(config.baseAPI + "/user/myorder/desc?uid=" + data.uid + "&ordernum=" + data.ordernum + "&token=" + config.token);
}

export function getReviewOrderData(data) {//待评价订单
    return request(config.baseAPI + "/user/myorder/reviewOrder?uid=" + data.uid + "&page=" + data.page + "&token=" + config.token);
}

export function getReviewServiceData() {//评价项目选项
    return request(config.baseAPI + "/home/reviews/service?token=" + config.token);
}

export function addReviewData(data) {//提交评价接口
    return request(config.baseAPI + "/home/reviews/add?token=" + config.token, "post", data);
}