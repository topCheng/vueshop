import {
    addOrderData,
    getOrderNumberData,
    myOrderData,
    cancelOrderData,
    confirmOrderData,
    orderDetailsData,
    getReviewOrderData,
    getReviewServiceData,
    addReviewData
} from "../../../api/order/order"

export default {
    namespaced: true,
    state: {
        myOrders: [],
        orderDetails: {},
        reviewOrder: [],
        reviewService: []
    },
    mutations: {
        ["SET_MY_ORDER"](state, payload) {
            state.myOrders = payload.myOrders;
        },
        //我的订单分页
        ["SET_MY_ORDER_PAGE"](state, payload) {
            state.myOrders.push(...payload.myOrders);
        },
        //取消订单
        ["CANCEL_ORDER"](state, payload) {
            state.myOrders.splice(payload.index, 1);
        },
        //改变订单状态
        ["SET_ORDER_STATUS"](state, payload) {
            state.myOrders[payload.index].status = payload.status;
        },
        //订单详情
        ["SET_ORDER_DETAILS"](state, payload) {
            state.orderDetails = payload.orderDetails;
        },
        //订单评价
        ["SET_REVIEW_ORDER"](state, payload) {
            state.reviewOrder = payload.reviewOrder;
        },
        //待评价订单分页
        ["SET_REVIEW_ORDER_PAGE"](state, payload) {
            state.reviewOrder.push(...payload.reviewOrder);
        },
        //评价项目选项
        ["SET_REVIEW_SERVICE"](state, payload) {
            state.reviewService = payload.reviewService;
            console.log(state.reviewService)
        },
        //评价分数
        ["SET_REVIEW_SCORE"](state, payload) {
            //console.log(payload)
            if (state.reviewService.length > 0) {
                for (let i = 0; i <= payload.index2; i++) {
                    state.reviewService[payload.index].scores[i].active = true;
                }
                for (let i = payload.index2 + 1; i < state.reviewService[payload.index].scores.length; i++) {
                    state.reviewService[payload.index].scores[i].active = false;
                }
                state.reviewService[payload.index].score = payload.score;
            }
        }
    },
    actions: {
        addOrder(conText, payload) {//提交订单
            addOrderData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getOrderNumber(conText, payload) {//获取订单编号
            getOrderNumberData(conText.rootState.user.uid).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    if (payload.success) {
                        payload.success(res);
                    }
                }
            });
        },
        myOrder(conText, payload) {//我的订单
            myOrderData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                let pageNum = 0;
                if (res.code === 200) {
                    pageNum = res.pageinfo.pagenum;
                    conText.commit("SET_MY_ORDER", {myOrders: res.data});
                } else {
                    pageNum = 0;
                    conText.commit("SET_MY_ORDER", {myOrders: []});
                }
                if (payload.success) {
                    payload.success(pageNum);
                }
            });
        },
        myOrderPage(conText, payload) {//我的订单分页
            myOrderData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_MY_ORDER_PAGE", {myOrders: res.data});
                }
                if (payload.success) {
                    payload.success();
                }
            });
        },
        cancelOrder(conText, payload) {//取消订单
            cancelOrderData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("CANCEL_ORDER", {index: payload.index});
                }
            });
        },
        confirmOrder(conText, payload) {//确认收货(订单)
            confirmOrderData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_ORDER_STATUS", {index: payload.index, status: payload.status});
                }
            });
        },
        getOrderDetails(conText, payload) {//会员订单详情
            orderDetailsData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_ORDER_DETAILS", {orderDetails: res.data});
                }
            });
        },
        getReviewOrder(conText, payload) {//待评价订单
            getReviewOrderData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                //console.log(res);
                let pageNum = 0;
                if (res.code === 200) {
                    pageNum = res.pageinfo.pagenum;
                    conText.commit("SET_REVIEW_ORDER", {reviewOrder: res.data});
                } else {
                    pageNum = 0;
                    conText.commit("SET_REVIEW_ORDER", {reviewOrder: []});
                }
                if (payload.success) {
                    payload.success(pageNum);
                }
            });
        },
        getReviewOrderPage(conText, payload) {//待评价订单分页
            getReviewOrderData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                if (res.code === 200) {
                    conText.commit("SET_REVIEW_ORDER_PAGE", {reviewOrder: res.data});
                }
            });
        },
        getReviewService(conText, payload) {//评价项目选项
            getReviewServiceData().then(res => {
                //console.log(res);
                if (res.code === 200) {
                    if (res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            res.data[i].score = 5;
                            res.data[i].scores = [
                                {value: 1, active: true},
                                {value: 2, active: true},
                                {value: 3, active: true},
                                {value: 4, active: true},
                                {value: 5, active: true}
                            ]
                        }
                    }
                    conText.commit("SET_REVIEW_SERVICE", {reviewService: res.data});
                }
            });
        },
        addReview(conText, payload) {
            addReviewData({uid: conText.rootState.user.uid, ...payload}).then(res => {
                console.log(res);
                if (payload.success) {
                    payload.success(res);
                }
            })
        }
    }
}