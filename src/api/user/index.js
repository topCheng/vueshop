import config from "../../assets/js/conf/config.js"
import {request} from "../../assets/js/utils/request.js"

export function loginData(data) {//会员登录
    return request(config.baseAPI + "/home/user/pwdlogin?token=" + config.token, "post", data)
}

export function safeUserData(data) {//会员登录认证
    return request(config.baseAPI + "/home/user/safe?token=" + config.token, "post", data);
}

export function safeLogoutData(data) {//安全退出
    return request(config.baseAPI + "/home/user/safeout?token=" + config.token, "post", data);
}

export function checkVCodeData(data) {//检测验证码
    return request(config.baseAPI + "/home/user/checkvcode?token=" + config.token, "post", data);
}

export function isRegData(username) {//是否注册过会员
    return request(config.baseAPI + "/home/user/isreg?token=" + config.token, "post", {username: username});
}

export function regData(data) {//会员注册
    return request(config.baseAPI + "/home/user/reg?token=" + config.token, "post", data);
}

export function getUserInfoData(uid) {//获取会员信息
    return request(config.baseAPI + "/user/myinfo/userinfo/uid/" + uid + "?token=" + config.token);
}

export function uploadHeadData(data) {//头像上传
    return request(config.baseAPI + "/user/myinfo/formdatahead?token=" + config.token, "file", data);
}

export function updateUserInfoData(data) {//修改会员信息
    return request(config.baseAPI + "/user/myinfo/updateuser?token=" + config.token, "post", data);
}

export function updateCellphoneData(data) {//修改手机号
    return request(config.baseAPI + "/user/myinfo/updatecellphone?token=" + config.token, "post", data);
}

export function modifyPasswordData(data) {//修改密码
    return request(config.baseAPI + "/user/myinfo/modpwd?token=" + config.token, "post", data);
}

export function myCollectionData(data) {//我的收藏
    return request(config.baseAPI + "/user/fav/index?uid=" + data.uid + "&token=" + config.token + "&page=" + data.page);
}

export function delCollectionData(data) {//删除收藏
    return request(config.baseAPI + "/user/fav/del?uid=" + data.uid + "&fid=" + data.fid + "&token=" + config.token);
}