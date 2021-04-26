import {getReviewData} from "../../../api/goods/goodsReview"

export default {
    namespaced: true,
    state: {
        goodsReview: [],
        total: 0
    },
    mutations: {
        ["SET_GOODS_REVIEW"](state, payload) {
            state.goodsReview = payload.goodsReview;
            state.total = payload.total;
        },
        ["SET_REVIEWS_PAGE"](state, payload) {
            state.goodsReview.push(...payload.goodsReview);
        }
    },
    actions: {
        getReview(conText, payload) {
            getReviewData(payload.gid).then(res => {
                //console.log(res);
                let pageNum = 0;
                if (res.code === 200) {
                    conText.commit("SET_GOODS_REVIEW", {goodsReview: res.data, total: res.pageinfo.total});
                    pageNum = res.pageinfo.pagenum;
                } else {
                    conText.commit("SET_GOODS_REVIEW", {goodsReview: [], total: 0});
                    pageNum = 0;
                }
                if (payload.success) {
                    payload.success(pageNum);
                }
            });
        },
        getReviewsPage(conText, payload) {
            getReviewData(payload.gid, payload.page).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_REVIEWS_PAGE", {goodsReview: res.data});
                }
            });
        }
    }
}