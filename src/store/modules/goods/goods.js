import Vue from "vue"
import {
    getClassifyData,
    getGoodsData,
    getGoodsDetailsData,
    getGoodsAttrsData,
    addCollectionData
} from "../../../api/goods/goods";

export default {
    namespaced: true,
    state: {
        classifyGoods: [],
        goods: [],
        attrs: [],
        details: {}
    },
    mutations: {
        ["SET_CLASSIFY"](state, payload) {
            state.classifyGoods = payload.classifyGoods;
        },
        ["SELECT_ITEM"](state, payload) {
            if (state.classifyGoods.length > 0) {
                for (let i = 0; i < state.classifyGoods.length; i++) {
                    if (state.classifyGoods[i].active) {
                        state.classifyGoods[i].active = false;
                        break;
                    }
                }
                state.classifyGoods[payload.index].active = true;
                Vue.set(state.classifyGoods, payload.index, state.classifyGoods[payload.index]);//解决数据改变视图不渲染的问题,需要引入vue
            }
        },
        ["SET_GOODS"](state, payload) {
            state.goods = payload.goods;
        },
        //选择属性
        ["SELECT_ATTR"](state, payload) {
            if (state.attrs.length > 0) {
                for (let i = 0; i < state.attrs[payload.index].values.length; i++) {
                    if (state.attrs[payload.index].values[i].active) {
                        state.attrs[payload.index].values[i].active = false;
                        break;
                    }
                }
                state.attrs[payload.index].values[payload.index2].active = true;
            }
            Vue.set(state.attrs[payload.index].values, payload.index2, state.attrs[payload.index].values[payload.index2]);
        },
        // 设置商品详情
        ["SET_DETAILS"](state, payload) {
            state.details = payload.details;
        },
        //设置商品规格
        ["SET_ATTRS"](state, payload) {
            state.attrs = payload.attrs;
        }
    },
    actions: {
        //左侧菜单
        getClassify(conText, payload) {
            getClassifyData().then(res => {
                //console.log(res);
                if (res.code === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].active = false;
                    }
                    conText.commit("SET_CLASSIFY", {classifyGoods: res.data});
                    if (payload && payload.success) {
                        payload.success();
                    }
                }
            });
        },
        //右侧商品
        getGoods(conText, payload) {
            getGoodsData(payload.cid).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_GOODS", {goods: res.data})
                    if (payload.success) {
                        payload.success();
                    }
                } else {
                    conText.commit("SET_GOODS", {goods: []})
                }
            });
        },
        getGoodsDetails(conText, payload) {
            getGoodsDetailsData(payload.gid).then(res => {
                console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_DETAILS", {details: res.data});
                    if (payload.success) {
                        payload.success();
                    }
                }
            });
        },
        getGoodsAttrs(conText, payload) {
            getGoodsAttrsData(payload.gid).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        for (let j = 0; j < res.data[i].values.length; j++) {
                            res.data[i].values[j].active = false;
                        }
                    }
                    conText.commit("SET_ATTRS", {attrs: res.data});
                    //console.log(res)
                }
            });
        },
        addCollection(conText, payload) {//加入收藏
            addCollectionData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    }
}