<template>
    <div ref="goods-content-main" class="goods-content-main">
        <div v-show="goods.length > 0">
            <div class="goods-wrap" v-for="(item, index) in goods" :key="index">
                <div class="classify-name">{{item.title}}</div>
                <div class="goods-items-wrap">
                    <ul v-for="(item2, index2) in item.goods" :key="index2" @click="$router.push('/goods/details?gid='+item2.gid)">
                        <li><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt=""></li>
                        <li>{{item2.title}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="no-data" v-show="goods.length <= 0">没有相关商品！</div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import IScroll from "../../../assets/js/libs/iscroll"

    export default {
        name: "classify_item",
        methods: {
            ...mapActions({
                getGoods: "goods/getGoods"
            }),
            preventScroll(e) {
                e.preventDefault();
            },
            init(cid) {
                this.getGoods({cid: cid, success: ()=> {
                    this.$nextTick(() => {
                        this.myScroll.refresh();
                        this.$utils.lazyImg();
                    });
                }});
            }
        },
        computed: {
            ...mapState({
                goods: (state) => state.goods.goods
            })
        },
        created() {
            this.cid = this.$route.query.cid ? this.$route.query.cid : "";
            //console.log(this.cid)
            this.init(this.cid);
        },
        beforeRouteUpdate(to, from, next) {
            //console.log(to.query.cid);
            this.init(to.query.cid);
            next();
        },
        mounted() {
            this.$refs["goods-content-main"].addEventListener("touchmove", this.preventScroll);
            this.myScroll = new IScroll(this.$refs["goods-content-main"], {
                scrollX: false,
                scrollY: true,
                preventDefault: false
            });
            this.myScroll.on("scrollEnd", () => {
                this.$utils.lazyImg();
            });
        },
        beforeDestroy() {
            this.$refs["goods-content-main"].removeEventListener("touchmove", this.preventScroll);
        }
    }
</script>

<style scoped>
    .goods-content-main {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
    }

    .goods-wrap {
        width: 100%;
        height: auto;
    }

    .goods-wrap .classify-name {
        font-size: .28rem;
        width: 100%;
        height: .6rem;
        line-height: .6rem;
        overflow: hidden;
    }

    .goods-wrap .goods-items-wrap {
        width: 100%;
        height: auto;
        background-color: #fff;
        padding-top: .2rem;
        overflow: hidden;
    }

    .goods-wrap .goods-items-wrap ul {
        width: 32%;
        height: auto;
        float: left;
        margin-left: .5%;
        margin-right: .5%;
        margin-bottom: .2rem;
    }

    .goods-wrap .goods-items-wrap ul li:first-child {
        width: 1.5rem;
        height: 1.5rem;
        overflow: hidden;
        margin: 0 auto;
        text-align: center;
    }

    .goods-wrap .goods-items-wrap ul li:first-child img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }

    .goods-wrap .goods-items-wrap ul li:nth-child(2) {
        width: 90%;
        height: .8rem;
        font-size: .24rem;
        overflow: hidden;
        text-align: center;
        margin: 0 auto;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: .2rem;
    }
</style>