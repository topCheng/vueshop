import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

/*import IndexPage from "./pages/index/index.vue"
import NewsPage from "./pages/news/news.vue"
import NewsDetails from "./pages/news/details.vue"
import NewsArticle from "./pages/news/article.vue"*/

let router = new Router({
    mode: "hash",//hash带"#"号,history不带"#"号
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, position) => {//与keepAlive配合使用
        //console.log(position);
        if (position) {
            return position;
        } else {
            return {x: 0, y: 0};
        }
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./pages/home/main/home"),//路由懒加载解決首屏加載慢的問題，性能優化
            redirect: "/index",
            meta: {
                keepAlive: false //缓存
            },
            children: [
                {
                    path: "index",
                    name: "index",
                    component: () => import("./pages/home/index"),
                    meta: {keepAlive: true, title: "首页"}
                },
                {
                    path: "cart",
                    name: "cart",
                    component: () => import("./pages/home/cart/cart"),
                    meta: {keepAlive: false, title: "购物车"}
                },
                {
                    path: "mine",
                    name: "mine",
                    component: () => import("./pages/user/personalCenter/personalCenter"),
                    meta: {keepAlive: false, title: "我的"}
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./pages/home/login/login"),
            meta: {keepAlive: false, title: "登录"}
        },
        {
            path: "/reg",
            name: "reg",
            component: () => import("./pages/home/reg/reg"),
            meta: {keepAlive: false, title: "注册"}
        },
        {
            path: "/personalCenter",
            name: "personal-center",
            component: () => import("./pages/user/personalCenter/personalCenter"),
            /*meta:{auth: true}*/
            /*beforeEnter: (to, from, next) => {
                if(Boolean(localStorage["isLogin"])) {
                    next();
                } else {
                    next("/login");
                }
            }*/
        },
        {
            path: "/order",
            name: "order",
            component: () => import("./pages/home/order/order"),
            meta: {auth: true, title: "确认订单"}
        },
        {
            path: "/order/result",
            name: "order-result",
            component: () => import("./pages/home/order/result"),
            meta: {auth: true, title: "订单结果"}
        },
        {
            path: "/address",
            name: "address",
            component: () => import("./pages/home/address/select"),
            meta: {auth: true, title: "选择收货地址"}
        },
        {
            path: "/address/add",
            name: "addAddress",
            component: () => import("./pages/home/address/add"),
            meta: {auth: true, title: "添加收货地址"}
        },
        {
            path: "/address/modify",
            name: "modifyAddress",
            component: () => import("./pages/home/address/modify"),
            meta: {auth: true, title: "修改收货地址"}
        },
        {
            path: "/goods/classify",
            name: "goods-classify",
            component: () => import("./pages/home/goods/classify"),
            redirect: "/goods/classify/item",
            children: [
                {
                    path: "item",
                    name: "goods-classify-item",
                    component: () => import("./pages/home/goods/classify_item"),
                    meta: {title: "商品分类"}
                }
            ]
        },
        {
            path: "/goods/search",
            name: "goods-search",
            component: () => import("./pages/home/goods/search")
        },
        {
            path: "/goods/details",
            name: "goods-details",
            component: () => import("./pages/home/goods/details"),
            redirect: "/goods/details/item",
            children: [
                {
                    path: "item",
                    name: "goods-item",
                    component: () => import("./pages/home/goods/details_item"),
                },
                {
                    path: "content",
                    name: "goods-content",
                    component: () => import("./pages/home/goods/details_content"),
                },
                {
                    path: "review",
                    name: "goods-review",
                    component: () => import("./pages/home/goods/details_review"),
                }
            ]
        },
        {
            path: "/user/order",
            name: "order",
            component: () => import("./pages/user/order/order"),
            redirect: "/user/order/list",
            meta: {auth: true},
            children: [
                {
                    path: "list",
                    name: "order-list",
                    component: () => import("./pages/user/order/order_list"),
                    meta: {auth: true}
                },
                {
                    path: "review",
                    name: "order-review",
                    component: () => import("./pages/user/order/order_review"),
                    meta: {auth: true}
                },
            ]
        },
        {
            path: "/user/order/details",
            name: "order-details",
            component: () => import("./pages/user/order/order_details"),
            meta: {auth: true, title: "订单详情"}
        },
        {
            path: "/user/order/add_review",
            name: "order-add-review",
            component: () => import("./pages/user/order/add_review"),
            meta: {auth: true, title: "评价"}
        },
        {
            path: "/user/profile",
            name: "profile",
            component: () => import("./pages/user/profile/profile"),
            meta: {auth: true, title: "个人资料"}
        },
        {
            path: "/user/address",
            name: "manage-address",
            component: () => import("./pages/user/address/manage_address"),
            meta: {auth: true, title: "收货地址管理"}
        },
        {
            path: "/user/address/add",
            name: "manage-address-add",
            component: () => import("./pages/user/address/add"),
            meta: {auth: true, title: "添加收货地址"}
        },
        {
            path: "/user/address/modify",
            name: "manage-address-modify",
            component: () => import("./pages/user/address/modify"),
            meta: {auth: true, title: "修改收货地址"}
        },
        {
            path: "/user/bind_cellphone",
            name: "bind-cellphone",
            component: () => import("./pages/user/bindCellphone/bind_cellphone"),
            meta: {auth: true, title: "绑定手机"}
        },
        {
            path: "/user/modify_password",
            name: "modify-password",
            component: () => import("./pages/user/modifyPassword/modify_password"),
            meta: {auth: true, title: "修改密码"}
        },
        {
            path: "/user/my_collection",
            name: "my-collection",
            component: () => import("./pages/user/myCollection/my_collection"),
            meta: {auth: true, title: "我的收藏"}
        }
    ]
});
//路由守卫
router.beforeEach((to, from, next) => {
    //console.log(to);
    if (to.meta.auth) {
        if (Boolean(localStorage["isLogin"])) {
            next();
        } else {
            next("/login");
        }
    } else {
        next();
    }
});
export default router