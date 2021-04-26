import Vue from "vue"

export default {
    namespaced: true,
    state: {
        cartData: localStorage["cartData"] ? JSON.parse(localStorage["cartData"]) : []
    },
    mutations: {
        //添加购物车
        ["ADD_ITEM"](state, payload) {
            let isSameGoods = false;
            if (state.cartData.length > 0) {
                for (let i = 0; i < state.cartData.length; i++) {
                    if (state.cartData[i].gid === payload.cartData.gid && JSON.stringify(state.cartData[i].attrs) === JSON.stringify(payload.cartData.attrs)) {
                        isSameGoods = true;
                        state.cartData[i].amount += payload.cartData.amount;
                        break;
                    }
                }
            }
            if (!isSameGoods) {
                state.cartData.push(payload.cartData);
            }
            localStorage["cartData"] = JSON.stringify(state.cartData);
        },
        //删除
        ["DELETE_ITEM"](state, payload) {
            state.cartData.splice(payload.index, 1);
            localStorage["cartData"] = JSON.stringify(state.cartData);
        },
        //更改数量
        ["SET_AMOUNT"](state, payload) {
            state.cartData[payload.index].amount = payload.amount;
            state.cartData[payload.index].amount = parseInt(state.cartData[payload.index].amount.replace(/[^\d]/g, ""));
            if (!state.cartData[payload.index].amount) {
                state.cartData[payload.index].amount = 1;
            }
            localStorage["cartData"] = JSON.stringify(state.cartData);
        },
        //增加数量
        ["INC_AMOUNT"](state, payload) {
            state.cartData[payload.index].amount += 1;
            Vue.set(state.cartData, payload.index, state.cartData[payload.index]);
            localStorage["cartData"] = JSON.stringify(state.cartData);
        },
        //减少
        ["DEC_AMOUNT"](state, payload) {
            state.cartData[payload.index].amount -= 1;
            if (state.cartData[payload.index].amount <= 1) {
                state.cartData[payload.index].amount = 1;
                Vue.set(state.cartData, payload.index, state.cartData[payload.index]);
                localStorage["cartData"] = JSON.stringify(state.cartData);
            }
        },
        //选择商品
        ["SELECT_ITEM"](state, payload) {
            state.cartData[payload.index].checked = !state.cartData[payload.index].checked
            Vue.set(state.cartData, payload.index, state.cartData[payload.index]);
        },
        //全选/反选
        ["ALL_SELECT_ITEM"](state, payload) {
            if (state.cartData.length > 0) {
                for (let i = 0; i < state.cartData.length; i++) {
                    state.cartData[i].checked = payload.checked;
                }
                Vue.set(state.cartData, payload.index, state.cartData[payload.index]);
            }
        }
    },
    action: {},
    getters: {
        //计算总金额
        total(state) {
            if (state.cartData.length > 0) {
                let total = 0;
                for (let i = 0; i < state.cartData.length; i++) {
                    if (state.cartData[i].checked) {
                        total = total + state.cartData[i].amount * state.cartData[i].price;
                    }
                }
                return total.toFixed(2);
            } else {
                return 0;
            }
        },
        //计算运费
        freight(state) {
            if (state.cartData.length > 0) {
                let freight = [];
                for (let i = 0; i < state.cartData.length; i++) {
                    if (state.cartData[i].checked) {
                        freight.push(state.cartData[i].freight);
                    }
                }
                return freight.length > 0 ? Math.max.apply(null, freight) : 0;
            } else {
                return 0;
            }
        }
    }
}