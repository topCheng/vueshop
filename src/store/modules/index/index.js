import {getSwiperData, getNavsData, getGoodsData, getRecomGoodsData} from "../../../api/index/index.js"
export default {
    namespaced: true,
    state: {
        navs: [],
        swipers: [],
        goods: [],
        recomGoods: []
    },
    mutations: {
        ["SET_SWIPER"](state, payload) {
            //console.log(state.swipers)
            state.swipers = payload.swipers;
        },
        ["SET_NAVS"](state, payload) {
            state.navs = payload.navs;
        },
        ["SET_GOODS"](state, payload) {
            state.goods = payload.goods;
        },
        ["SET_RECOM"](state, payload) {
            state.recomGoods = payload.recomGoods;
        }
    },
    actions: {
        getSwipers(conText, payload) {
            //console.log(payload)
            getSwiperData().then(res=> {
                //console.log(res);
                if(res.code === 200) {
                    conText.commit("SET_SWIPER", {swipers: res.data});
                    if(payload.success) {
                        payload.success();
                    }
                }
            });
        },
        getNavs(conText, payload) {
            getNavsData().then(res=> {
                //console.log(res);
                if(res.code === 200) {
                    conText.commit("SET_NAVS", {navs: res.data});
                    if(payload.success) {
                        payload.success();
                    }
                }
            });
        },
        getGoods(conText, payload) {
            getGoodsData().then(res => {
                //console.log(res);
                if(res.code === 200) {
                    conText.commit("SET_GOODS", {goods: res.data});
                    if(payload.success) {
                        payload.success();
                    }
                }
            });
        },
        getRecomGoods(conText, payload) {
            getRecomGoodsData().then(res => {
                //console.log(res);
                if(res.code === 200) {
                    conText.commit("SET_RECOM", {recomGoods: res.data});
                    if(payload.success) {
                        payload.success();
                    }
                }
            });
        }
    }
}