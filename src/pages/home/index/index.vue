<template>
    <div class="page">
        <div :class="{header:true, scroll: isScrollTop}">
            <div class="classify-icon" @click="$router.push('/goods/classify')"></div>
            <div class="search-wrap" @click="isShowSearch.show=true">
                <div class="search-icon"></div>
                <div class="search-text">请输入宝贝名称</div>
            </div>
            <div class="login" v-if="!isLogin" @click="$router.push('/login')">登录</div>
            <div class="my-icon" v-else @click="$router.push('/mine')"></div>
        </div>
        <div class="banner-wrap">
            <div class="swiper-container" ref="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in swipers" :key="index">
                        <img :src="item.image" alt="">
                    </div>
                </div>
                <div class="swiper-pagination" ref="swiper-pagination"></div>
            </div>
        </div>
        <div class="quick-nav">
            <ul>
                <li v-for="(item, index) in navs" :key="index" @click="$router.push('/goods/details?cid='+item.cid)">
                    <div><img src="../../../assets/images/common/lazyImg.jpg" alt="" :data-echo="item.image"></div>
                    <div>{{item.title}}</div>
                </li>
            </ul>
        </div>
        <template v-for="(item, index) in goods">
            <div class="goods-main" :key="index" v-if="(index+1)%2!==0">
                <div :class="'classify-name color-'+index">—— {{item.title}} ——</div>
                <div class="goods-row-1">
                    <div class="goods-column"
                         @click="$router.push('/goods/details?gid='+(item.items &&item.items[0].gid))">
                        <div class="goods-title">{{item.items && item.items[0].title}}</div>
                        <div class="goods-tip">精品打折</div>
                        <div :class="'goods-price bg-color-'+index">{{item.items && item.items[0].price}}元</div>
                        <div class="goods-image">
                            <img src="../../../assets/images/common/lazyImg.jpg"
                                 :data-echo="item.items && item.items[0].image"
                                 :alt="item.items && item.items[0].title">
                        </div>
                    </div>
                    <div class="goods-column">
                        <div class="goods-list" v-for="(item2, index2) in item.items.slice(1,3)" :key="index2"
                             @click="$router.push('/goods/details?gid='+item2.gid)">
                            <div class="goods-list-title">{{item2.title}}</div>
                            <div class="goods-list-tip">品质精挑</div>
                            <div class="goods-list-image">
                                <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image"
                                     :alt="item2.title">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods-row-2">
                    <div class="goods-list" v-for="(item2, index2) in item.items.slice(3, 7)" :key="index2"
                         @click="$router.push('/goods/details?gid='+item2.gid)">
                        <div class="goods-title">{{item2.title}}</div>
                        <div class="goods-image">
                            <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt="">
                        </div>
                        <div class="price">¥{{item2.price}}</div>
                        <div class="price line">¥{{item2.price * 2}}</div>
                    </div>
                </div>
            </div>
            <div class="goods-main" v-else>
                <div class="classify-name color-1">——{{item.title}}——</div>
                <div class="goods-row-1">
                    <div class="goods-column-2" v-for="(item2, index2) in item.items.slice(0, 2)" :key="index2"
                         @click="$router.push('/goods/details?gid='+item2.gid)">
                        <div class="goods-title">{{item2.title}}</div>
                        <div class="goods-tip">火爆开售</div>
                        <div class="goods-image"><img src="../../../assets/images/common/lazyImg.jpg"
                                                      :data-echo="item2.image" :alt="item2.title"></div>
                    </div>
                </div>
                <div class="goods-row-2">
                    <div class="goods-list" v-for="(item2, index2) in item.items.slice(2,6)" :key="index2"
                         @click="$router.push('/goods/details?gid='+item2.gid)">
                        <div class="goods-title">{{item2.title}}</div>
                        <div class="goods-image"><img src="../../../assets/images/common/lazyImg.jpg"
                                                      :data-echo="item2.image" alt=""></div>
                        <div class="price">¥{{item2.price}}</div>
                        <div class="price line">¥{{item2.price*2}}</div>
                    </div>
                </div>
            </div>
        </template>
        <div class="goods-recom-nav">
            <div class="line"></div>
            <div class="recom-wrap">
                <div class="icon"></div>
                <div class="text">为您推荐</div>
            </div>
            <div class="line"></div>
        </div>
        <div class="goods-recom">
            <div class="goods-list" v-for="(item, index) in recomGoods" :key="index"
                 @click="$router.push('/goods/details?gid='+item.gid)">
                <div class="goods-image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="(item.image)"
                                              :alt="item.title"></div>
                <div class="goods-title">{{item.title}}</div>
                <div class="goods-price">¥{{item.price}}</div>
            </div>
        </div>
        <my-search :showSearch="isShowSearch"></my-search>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import Swiper from "../../../assets/js/libs/swiper-3.4.2.min"
    import MySearch from "../../../components/search/search"

    export default {
        name: "index",
        data() {
            return {
                isScrollTop: false,
                isShowSearch: {show: false}
            }
        },
        components: {
            MySearch
        },
        created() {
            this.isScroll = true;
            window.addEventListener("scroll", this.eventScrollTop);
            this.getSwiper({
                success: () => {
                    this.$nextTick(() => {
                        let mySwiper = new Swiper(this.$refs["swiper-container"], {
                            autoplay: 3000,//可选选项，自动滑动
                            pagination: this.$refs["swiper-pagination"],
                            paginationClickable: true,
                            autoplayDisableOnInteraction: false
                        });
                    });
                }
            });
            this.getNavs({
                success: () => {
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                }
            });
            this.getGoods({
                success: () => {
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                }
            });
            this.getRecomGoods({
                success: () => {
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                }
            });
        },
        mounted() {

        },
        destroyed() {
            window.removeEventListener("scroll", this.eventScrollTop);
        },
        activated() {//keep-alive组件激活时调用
            this.isScroll = true;
            window.addEventListener("scroll", this.eventScrollTop);
        },
        deactivated() {//keep-alive组件停用时调用
            window.removeEventListener("scroll", this.eventScrollTop);
        },
        computed: {
            ...mapState({
                swipers: (state) => {
                    //console.log(state);
                    return state.index.swipers;
                },
                navs: (state) => {
                    //console.log(state)
                    return state.index.navs;
                },
                goods: (state) => {
                    //console.log(state.index.goods);
                    return state.index.goods;
                },
                recomGoods: (state) => {
                    return state.index.recomGoods;
                },
                isLogin: state => state.user.isLogin
            }),
        },
        methods: {
            ...mapActions({
                getSwiper: "index/getSwipers",
                getNavs: "index/getNavs",
                getGoods: "index/getGoods",
                getRecomGoods: "index/getRecomGoods"
            }),
            eventScrollTop() {
                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollTop >= 150) {
                    if (this.isScroll) {
                        this.isScroll = false;
                        this.isScrollTop = true;
                    }
                } else {
                    if (this.isScroll == false) {
                        this.isScroll = true;
                        this.isScrollTop = false;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    @import url("../../../assets/css/common/swiper-3.4.2.min.css");

    .page {
        width: 100%;
        min-height: 100%;
        margin-bottom: 1.5rem;
    }

    .header {
        width: 100%;
        height: 1rem;
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
        background: -webkit-gradient(linear, left top, left bottom, from(rgba(1, 1, 1, .2)), to(hsla(0, 0%, 100%, 0)));
        background: linear-gradient(rgba(1, 1, 1, .2), hsla(0, 0%, 100%, 0));
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .3rem;
    }

    .header.scroll {
        background: -webkit-gradient(linear, left top, left bottom, from(#eb1625), to(hsla(0, 0%, 100%, 0)));
        background: linear-gradient(#eb1625, hsla(0, 0%, 100%, 0));
    }

    .header .classify-icon {
        width: .6rem;
        height: .6rem;
        background-image: url("../../../assets/images/common/class.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .header .search-wrap {
        width: 5.26rem;
        height: .52rem;
        background-color: rgba(255, 255, 255, 0.5);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        display: flex;
        align-items: center;
    }

    .header .search-wrap .search-icon {
        width: .44rem;
        height: .44rem;
        background-image: url("../../../assets/images/common/search.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-left: .2rem;
        margin-right: .2rem;
    }

    .header .search-wrap .search-text {
        font-size: .32rem;
        color: #fff;
    }

    .header .login {
        width: auto;
        height: .44rem;
        font-size: .32rem;
        color: #fff;
    }

    .header .my-icon {
        width: 0.6rem;
        height: 0.6rem;
        background-image: url("../../../assets/images/home/main/mine.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .banner-wrap {
        width: 100%;
        height: 3.66rem;
    }

    .banner-wrap img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .quick-nav {
        width: 100%;
        height: 1.6rem;
        background-color: #fff;
        margin-top: .2rem;
    }

    .quick-nav ul {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .2rem;
    }

    .quick-nav ul li {
        width: 1.4rem;
    }

    .quick-nav ul li img {
        width: 100%;
        height: 100%;
    }

    .quick-nav ul li > div:first-child {
        width: .8rem;
        height: .8rem;
        margin: 0 auto;
    }

    .quick-nav ul li > div:last-child {
        font-size: .28rem;
        text-align: center;
        color: #7b7f82;
        margin-top: .2rem;
    }

    .goods-main {
        width: 100%;
        height: 7.36rem;
        background-color: #fff;
        margin-top: .2rem;
    }

    .goods-main .classify-name {
        width: 100%;
        height: .64rem;
        border-bottom: 1px solid #efefef;
        font-size: .32rem;
        text-align: center;
        line-height: .64rem;
    }

    .goods-main .classify-name.color-0 {
        color: #f73b61;
    }

    .goods-main .classify-name.color-1 {
        color: #fe6719;
    }

    .goods-main .classify-name.color-2 {
        color: #5fc600;
    }

    .goods-main .goods-row-1 {
        width: 100%;
        height: 3.5rem;
        border-bottom: 1px solid #efefef;
        display: flex;
        overflow: hidden;
    }

    .goods-main .goods-row-1 .goods-column-2,
    .goods-main .goods-row-1 .goods-column {
        width: 50%;
        height: 100%;
        border-right: 1px solid #efefef;
        position: relative;
    }

    .goods-main .goods-row-1 .goods-column .goods-title {
        width: 95%;
        height: .32rem;
        overflow: hidden;
        position: absolute;
        left: .2rem;
        top: .2rem;
        font-size: .28rem;
        font-weight: 700;
    }

    .goods-main .goods-row-1 .goods-column .goods-tip {
        width: auto;
        height: auto;
        font-size: .28rem;
        color: #cb385d;
        position: absolute;
        left: .2rem;
        top: .6rem;
    }

    .goods-main .goods-row-1 .goods-column .goods-price {
        width: auto;
        height: .4rem;
        border-radius: 10px;
        position: absolute;
        right: 1rem;
        top: .6rem;
        color: #fff;
        font-size: .28rem;
    }

    .goods-main .goods-row-1 .goods-column .goods-price.bg-color-0 {
        background-color: #f21d4f;
    }

    .goods-main .goods-row-1 .goods-column .goods-price.bg-color-2 {
        background-color: #5fc600;
    }

    .goods-main .goods-row-1 .goods-column .goods-image {
        width: 3rem;
        height: 2rem;
        position: absolute;
        left: .35rem;
        bottom: .3rem;
    }

    .goods-main .goods-row-1 .goods-column .goods-image img {
        width: 100%;
        height: auto;
    }

    .goods-main .goods-row-1 .goods-column .goods-list {
        width: 100%;
        height: 50%;
        border-bottom: 1px solid #efefef;
        position: relative;
    }

    .goods-main .goods-row-1 .goods-column .goods-list:last-child {
        border-bottom: 0;
    }

    .goods-main .goods-row-1 .goods-column .goods-list-title {
        width: 2.04rem;
        height: .32rem;
        overflow: hidden;
        font-size: .28rem;
        font-weight: 700;
        position: absolute;
        z-index: 1;
        left: .2rem;
        top: .2rem;
    }

    .goods-main .goods-row-1 .goods-column .goods-list-tip {
        width: auto;
        height: auto;
        font-size: .24rem;
        color: #7b7f82;
        position: absolute;
        left: .2rem;
        top: .6rem;
    }

    .goods-main .goods-row-1 .goods-column .goods-list-image {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        right: .2rem;
        top: .2rem;
    }

    .goods-main .goods-row-1 .goods-column .goods-list-image img {
        width: 100%;
        height: auto;
    }

    .goods-main .goods-row-1 .goods-column-2 .goods-title {
        width: 95%;
        height: .32rem;
        overflow: hidden;
        font-size: .28rem;
        font-weight: 700;
        text-align: center;
        margin: 0 auto;
        margin-top: .2rem;
    }

    .goods-main .goods-row-1 .goods-column-2 .goods-tip {
        width: auto;
        height: auto;
        font-size: .28rem;
        color: #7b7f82;
        text-align: center;
        margin-top: .1rem;
    }

    .goods-main .goods-row-1 .goods-column-2 .goods-image {
        width: 1.8rem;
        height: 2rem;
        margin: 0 auto;
        margin-top: .1rem;
    }

    .goods-main .goods-row-1 .goods-column-2 .goods-image img {
        width: 100%;
        height: auto;
    }

    .goods-main .goods-row-2 {
        width: 100%;
        height: 3.2rem;
        overflow: hidden;
        display: flex;
    }

    .goods-main .goods-row-2 .goods-list {
        width: 25%;
        height: 100%;
        border-right: 1px solid #efefef;
    }

    .goods-main .goods-row-2 .goods-title {
        width: 100%;
        height: .4rem;
        overflow: hidden;
        font-size: .28rem;
        font-weight: 700;
        text-align: center;
        margin-top: .2rem;
    }

    .goods-main .goods-row-2 .goods-image {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto;
        margin-top: .2rem;
    }

    .goods-main .goods-row-2 .goods-image img {
        width: 100%;
        height: auto;
    }

    .goods-main .goods-row-2 .price {
        width: 100%;
        height: auto;
        text-align: center;
        font-size: .28rem;
        color: #d32a4e;
        margin-top: .1rem;
    }

    .goods-main .goods-row-2 .price.line {
        color: #7b7f82;
        text-decoration: line-through;
        margin-top: 0;
    }

    .goods-recom-nav {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .goods-recom-nav .line {
        width: 35%;
        height: 1px;
        background-color: #d4d4d4;
    }

    .goods-recom-nav .recom-wrap {
        width: 1.8rem;
        height: .44rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .goods-recom-nav .recom-wrap .icon {
        width: .4rem;
        height: .4rem;
        background-image: url("../../../assets/images/common/recom.png");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .goods-recom-nav .recom-wrap .text {
        width: auto;
        height: auto;
        font-size: .32rem;
        font-weight: 700;
    }

    .goods-recom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 .2rem;
        flex-wrap: wrap;
    }

    .goods-recom .goods-list {
        width: 48%;
        height: 4.5rem;
        background-color: #fff;
        margin-top: .2rem;
    }

    .goods-recom .goods-list .goods-image {
        width: 2.8rem;
        height: 2.8rem;
        margin: 0 auto;
        margin-top: .2rem;
        overflow: hidden;
    }

    .goods-recom .goods-list .goods-image img {
        width: 100%;
        height: auto;
    }

    .goods-recom .goods-list .goods-title {
        width: 100%;
        height: .8rem;
        overflow: hidden;
        font-size: .28rem;
        margin-top: .1rem;
        padding: 0 .1rem;
    }

    .goods-recom .goods-list .goods-price {
        width: auto;
        height: auto;
        font-size: .32rem;
        color: #d32a4e;
        margin-top: .1rem;
        padding: 0 .1rem;
    }
</style>