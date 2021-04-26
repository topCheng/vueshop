import Vue from "vue"
import Vuex from "vuex"
import user from "./modules/user/index"
import index from "./modules/index"
import goods from "./modules/goods/goods"
import search from "./modules/search/search"
import goodsReview from "./modules/goods/goodsReview"
import cart from "./modules/cart/cart"
import address from "./modules/address/address"
import order from "./modules/order/order"

Vue.use(Vuex)

let store = new Vuex.Store({
    modules: {
        user,
        index,
        goods,
        search,
        goodsReview,
        cart,
        address,
        order
    }

});
export default store;