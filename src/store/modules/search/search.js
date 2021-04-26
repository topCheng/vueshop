import {getHotwordsData, getSearchData, getAttrsData} from "../../../api/search/search"
import Vue from "vue"

export default {
    namespaced: true,
    state: {
        historyKeywords: localStorage["historyKeywords"] ? JSON.parse(localStorage["historyKeywords"]) : [],
        hotwords: [],
        priceRangeData: [
            {price1: 1, price2: 50, active: false},
            {price1: 51, price2: 99, active: false},
            {price1: 100, price2: 300, active: false},
            {price1: 301, price2: 1000, active: false},
            {price1: 1001, price2: 4000, active: false},
            {price1: 4001, price2: 9999, active: false}
        ],
        minPrice: "",
        maxPrice: "",
        attrs: [],
        searchData: [],
        cid: "",
        params: [],
        total: 0
    },
    mutations: {
        ["SET_KEYWORDS"](state, payload) {
            state.historyKeywords = payload.historyKeywords;
            //console.log(state.historyKeywords);
            localStorage["historyKeywords"] = JSON.stringify(state.historyKeywords);
        },
        ["CLEAR_KEYWORDS"](state, payload) {
            state.historyKeywords = [];
            localStorage.removeItem("historyKeywords");
        },
        ["GET_HOTWORDS"](state, payload) {
            state.hotwords = payload.hotwords;
        },
        ["SELECT_PRICE_RANGE"](state, payload) {
            if (state.priceRangeData.length > 0) {
                for (let i = 0; i < state.priceRangeData.length; i++) {
                    if (i !== payload.index) {
                        if (state.priceRangeData[i].active) {
                            state.priceRangeData[i].active = false;
                            break;
                        }
                    }
                }
                state.priceRangeData[payload.index].active = !state.priceRangeData[payload.index].active;
                Vue.set(state.priceRangeData, payload.index, state.priceRangeData[payload.index]);
                state.minPrice = state.priceRangeData[payload.index].active ? state.priceRangeData[payload.index].price1 : "";
                state.maxPrice = state.priceRangeData[payload.index].active ? state.priceRangeData[payload.index].price2 : "";
            }
        },
        ["SET_MINPRICE"](state, payload) {
            state.minPrice = payload.minPrice;
            state.minPrice = state.minPrice.replace(/[^\d|\.]/g, "");
        },
        ["SET_MAXPRICE"](state, payload) {
            state.maxPrice = payload.maxPrice;
            state.maxPrice = state.maxPrice.replace(/[^\d|\.]/g, "");
        },
        //选择属性
        ["SELECT_ATTR"](state, payload) {
            state.attrs[payload.index].param[payload.index2].active = !state.attrs[payload.index].param[payload.index2].active;
            Vue.set(state.attrs[payload.index].param, payload.index2, state.attrs[payload.index].param[payload.index2]);
        },
        ["SET_SEARCH"](state, payload) {
            state.searchData = payload.searchData;
            state.total = payload.total;
        },
        ["SET_SEARCH_PAGE_DATA"](state, payload) {
            if (payload.searchData.length > 0) {
                for (let i = 0; i < payload.searchData.length; i++) {
                    state.searchData.push(payload.searchData[i]);
                }
            }
        },
        //设置cid
        ["SET_CID"](state, payload) {
            state.cid = payload.cid;
        },
        ["SET_ATTRS"](state, payload) {
            state.attrs = payload.attrs;
        },
        //设置属性的值
        ["SET_PID"](state, payload) {
            //param
            if (state.attrs.length > 0) {
                state.params = [];
                for (let i = 0; i < state.attrs.length; i++) {
                    for (let j = 0; j < state.attrs[i].param.length; j++) {
                        if (state.attrs[i].param[j].active) {
                            state.params.push(state.attrs[i].param[j].pid);
                        }
                    }
                }
                //console.log(state.params);
            }
        },
        ["RESET"](state, payload) {
            state.cid = "";
            //重置价格
            if (state.priceRangeData.length > 0) {
                for (let i = 0; i < state.priceRangeData.length; i++) {
                    if (state.priceRangeData[i].active) {
                        state.priceRangeData[i].active = false;
                        break;
                    }
                }
                state.minPrice = "";
                state.maxPrice = "";
            }
            //重置属性
            if (state.attrs.length > 0) {
                for (let i = 0; i < state.attrs.length; i++) {
                    for (let j = 0; j < state.attrs[i].param.length; j++) {
                        if (state.attrs[i].param[j].active) {
                            state.attrs[i].param[j].active = false;
                        }
                    }
                }
                state.params = [];
            }
        }
    },
    actions: {
        getHotwords(conText, payload) {
            getHotwordsData().then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("GET_HOTWORDS", {hotwords: res.data})
                }
            });
        },
        //选择分类
        selectClassify(conText, payload) {
            //console.log(conText, payload);
            if (conText.rootState.goods.classifyGoods.length > 0) {
                for (let i = 0; i < conText.rootState.goods.classifyGoods.length; i++) {
                    if (conText.rootState.goods.classifyGoods[i].active) {
                        conText.rootState.goods.classifyGoods[i].active = conText.rootState.goods.classifyGoods[payload.index].active;
                        break;
                    }
                }
                conText.rootState.goods.classifyGoods[payload.index].active = !conText.rootState.goods.classifyGoods[payload.index].active;
                Vue.set(conText.rootState.goods.classifyGoods, payload.index, conText.rootState.goods.classifyGoods[payload.index]);
                if (conText.rootState.goods.classifyGoods[payload.index].active) {
                    conText.commit("SET_CID", {cid: conText.rootState.goods.classifyGoods[payload.index].cid});
                } else {
                    conText.commit("SET_CID", {cid: ""});
                }
            }
        },
        //产品搜索结果
        getSearch(conText, payload) {
            getSearchData(payload).then(res => {
                let pageNum = 0;
                //console.log(res);
                if (res.code === 200) {
                    pageNum = res.pageinfo.pagenum;
                    conText.commit("SET_SEARCH", {searchData: res.data, total: res.pageinfo.total});
                } else {
                    pageNum = 0;
                    conText.commit("SET_SEARCH", {searchData: [], total: 0});
                }
                if (payload.success) {
                    payload.success(pageNum);
                }
            })
        },
        //分页
        getSearchPage(conText, payload) {
            getSearchData(payload).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_SEARCH_PAGE_DATA", {searchData: res.data});
                }
            })
        },
        //获取商品属性
        getAttrs(conText, payload) {
            getAttrsData(payload.keyword).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].isHide = false;
                        for (let j = 0; j < res.data[i].param.length; j++) {
                            res.data[i].param[j].active = false;
                        }
                    }
                    //console.log(res.data);
                    conText.commit("SET_ATTRS", {attrs: res.data});
                } else {
                    conText.commit("SET_ATTRS", {attrs: []});
                }
                if (payload.success) {
                    payload.success();
                }
            });
        },
        //筛选面板重置
        reset(conText, payload) {
            //重置分类
            if (conText.rootState.goods.classifyGoods.length > 0) {
                for (let i = 0; i < conText.rootState.goods.classifyGoods.length; i++) {
                    if (conText.rootState.goods.classifyGoods[i].active) {
                        conText.rootState.goods.classifyGoods[i].active = false;
                        break;
                    }
                }
            }
            conText.commit("RESET");
        }
    }
}