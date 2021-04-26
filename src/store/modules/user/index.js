import {
    loginData,
    safeUserData,
    safeLogoutData,
    checkVCodeData,
    isRegData,
    regData,
    getUserInfoData,
    uploadHeadData,
    updateUserInfoData,
    updateCellphoneData,
    modifyPasswordData,
    myCollectionData,
    delCollectionData
} from "../../../api/user/index"

export default {
    namespaced: true,
    state: {
        uid: localStorage["uid"] ? localStorage["uid"] : "",
        nickname: localStorage["nickname"] ? localStorage["nickname"] : "",
        isLogin: localStorage["isLogin"] ? Boolean(localStorage["isLogin"]) : false,
        authToken: localStorage["authToken"] ? localStorage["authToken"] : "",
        head: "",
        points: "",
        collection: []
    },
    mutations: {
        ["SET_LOGIN"](state, payload) {
            //console.log(payload);
            state.uid = payload.uid;
            state.nickname = payload.nickname;
            state.isLogin = payload.isLogin;
            state.authToken = payload.authToken;
            localStorage["uid"] = state.uid;
            localStorage["nickname"] = state.nickname;
            localStorage["isLogin"] = state.isLogin;
            localStorage["authToken"] = state.authToken;
        },
        ["USER_LOGOUT"](state, payload) {//安全退出
            state.uid = "";
            state.nickname = "";
            state.isLogin = false;
            state.authToken = "";
            state.head = "";
            state.points = 0;
            localStorage.removeItem("uid");
            localStorage.removeItem("nickname");
            localStorage.removeItem("isLogin");
            localStorage.removeItem("authToken");
            localStorage.removeItem("cartData");
            sessionStorage.removeItem("addsid");
        },
        ["SET_USER_INFO"](state, payload) {
            state.head = payload.head;
            state.points = payload.points;
            state.nickname = payload.nickname;
        },
        ["SET_COLLECTION"](state, payload) {
            state.collection = payload.collection;
        },
        ["SET_COLLECTION_PAGE"](state, payload) {
            state.collection.push(...payload.collection);
        },
        ["DEL_COLLECTION"](state, payload) {
            state.collection.splice(payload.index, 1);
        }
    },
    actions: {
        login(conText, payload) {//会员登录
            loginData(payload).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_LOGIN", {
                        uid: res.data.uid,
                        nickname: res.data.nickname,
                        authToken: res.data.auth_token,
                        isLogin: true
                    })
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        userLogout(conText, payload) {//安全退出
            safeLogoutData({uid: conText.state.uid}).then(res => {
                //console.log(res);
            });
            conText.rootState.cart.cartData = [];
            conText.commit("USER_LOGOUT");
        },
        safeUser(conText, payload) {//会员登录认证
            //console.log(conText);
            safeUserData({uid: conText.state.uid, auth_token: conText.state.authToken}).then(res => {
                //console.log(res);
                if (res.code !== 200) {
                    conText.rootState.cart.cartData = [];
                    conText.commit("USER_LOGOUT");
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        checkVCode(conText, payload) {//检测验证码
            return checkVCodeData(payload).then(res => {
                return res;
            });
        },
        isReg(conText, payload) {//是否注册过会员
            return isRegData(payload.username).then(res => {
                return res;
            });
        },
        regUser(conText, payload) {//注册会员
            regData(payload).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getUserInfo(conText, payload) {//获取会员信息
            getUserInfoData(conText.state.uid).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_USER_INFO", {
                        head: res.data.head,
                        points: res.data.points,
                        nickname: res.data.nickname
                    });
                    if (payload && payload.success) {
                        payload.success(res);
                    }
                }
            });
        },
        uploadHead(conText, payload) {//头像上传
            uploadHeadData(payload).then(res => {
                //console.log(res);
                if (payload.success) {
                    payload.success(res);
                }
            })
        },
        updateUserInfo(conText, payload) {//修改会员信息
            updateUserInfoData({uid: conText.state.uid, ...payload}).then(res => {
                //console.log(res);
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        updateCellphone(conText, payload) {//修改手机号
            updateCellphoneData({uid: conText.state.uid, ...payload}).then(res => {
                //console.log(res);
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        modifyPassword(conText, payload) {//修改密码
            modifyPasswordData({uid: conText.state.uid, ...payload}).then(res => {
                //console.log(res);
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        myCollection(conText, payload) {//我的收藏
            myCollectionData({uid: conText.state.uid, ...payload}).then(res => {
                console.log(res);
                let pageNum = 0;
                if (res.code == 200) {
                    conText.commit("SET_COLLECTION", {collection: res.data});
                    pageNum = res.pageinfo.pagenum;
                } else {
                    conText.commit("SET_COLLECTION", {collection: []});
                    pageNum = 0;
                }
                if (payload.success) {
                    payload.success(pageNum);
                }
            })
        },
        myCollectionPage(conText, payload) {//我的收藏分页
            myCollectionData({uid: conText.state.uid, ...payload}).then(res => {
                if (res.code == 200) {
                    conText.commit("SET_COLLECTION_PAGE", {collection: res.data});
                    if (payload.success) {
                        payload.success();
                    }
                }
            });
        },
        delCollection(conText, payload) {//删除收藏
            delCollectionData({uid: conText.state.uid, ...payload}).then(res => {
                console.log(res);
                if (res.code === 200) {
                    conText.commit("DEL_COLLECTION", {index: payload.index});
                    if (payload.success) {
                        payload.success(res);
                    }
                }
            });
        }
    }
}