import config from "../../assets/js/conf/config.js"
import {request} from "../../assets/js/utils/request.js"

export function getAddressData(uid) {//收货地址列表
    return request(config.baseAPI + "/user/address/index?uid=" + uid + "&token=" + config.token);
}

export function delAddressData(data) {//删除收货地址
    return request(config.baseAPI + "/user/address/del?uid=" + data.uid + "&aid=" + data.aid + "&token=" + config.token);
}


export function addAddressData(data) {//添加收货地址
    return request(config.baseAPI + "/user/address/add?token=" + config.token, "post", data);
}

export function getAddressInfoData(data) {//获取收货地址信息
    return request(config.baseAPI + "/user/address/info?uid=" + data.uid + "&aid=" + data.aid + "&token=" + config.token);
}

export function modifyAddressData(data) {//修改收货地址
    return request(config.baseAPI + "/user/address/mod?token=" + config.token, "post", data);
}


export function getDefaultAddressData(uid) {//获取默认收货地址
    return request(config.baseAPI + "/user/address/defaultAddress?uid=" + uid + "&token=" + config.token);
}
