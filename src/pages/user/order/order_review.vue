<template>
    <div>
        <div class="order-list" v-for="(item,index) in reviewOrder" :key="index"
             @click="$router.push('/user/order/details?ordernum='+item.ordernum)">
            <div class="ordernum-wrap">
                <div class="ordernum">订单编号：{{item.ordernum}}</div>
                <div class="status">{{item.status=='0'?"待付款":item.status==="1"?"待收货":"已收货"}}</div>
            </div>
            <div class="item-list" v-for="(item2,index2) in item.goods" :key="index2">
                <div class="image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt="">
                </div>
                <div class="title">{{item2.title}}</div>
                <div class="amount">x {{item2.amount}}</div>
                <div class="status-btn" @click.stop="$router.push('/user/order/add_review?gid='+item2.gid+'&ordernum='+item.ordernum)">{{item2.isreview==="0"?"评价":"追加评价"}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import UpRefresh from "../../../assets/js/libs/uprefresh"

    export default {
        name: "order_review",
        methods: {
            ...mapActions({
                getReviewOrder: "order/getReviewOrder",
                getReviewOrderPage: "order/getReviewOrderPage"
            })
        },
        computed: {
            ...mapState({
                reviewOrder: state => state.order.reviewOrder
            })
        },
        created() {
            this.pullUp = new UpRefresh();
            this.$utils.safeUser(this);
            this.getReviewOrder({
                page: 1, success: (pageNum) => {
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                    this.pullUp.init({
                        "curPage": 1,
                        "maxPage": parseInt(pageNum),
                        "offsetBottom": 100
                    }, (page) => {
                        //console.log(page);
                        this.getReviewOrderPage({
                            page: page
                        });
                    });
                }
            });
        },
        beforeDestroy() {
            this.pullUp.uneventSrcoll();
        },
    }
</script>

<style scoped>
    .order-list {
        width: 100%;
        height: auto
    }

    .order-list .ordernum-wrap {
        width: 100%;
        height: .8rem;
        border-bottom: 1px solid #efefef;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding-left: 2%;
        padding-right: 2%;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center
    }

    .order-list .ordernum-wrap .ordernum, .order-list .ordernum-wrap .status {
        width: auto;
        height: auto;
        font-size: .28rem
    }

    .item-list {
        width: 100%;
        height: 2.4rem;
        border-bottom: 1px solid #efefef;
        position: relative;
        z-index: 1
    }

    .item-list .image {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        z-index: 1;
        left: 2%;
        top: .2rem
    }

    .item-list .image img {
        width: 100%;
        height: 100%
    }

    .item-list .title {
        width: 72%;
        height: auto;
        font-size: .28rem;
        position: absolute;
        z-index: 1;
        left: 22%;
        top: .2rem
    }

    .item-list .amount {
        width: auto;
        height: auto;
        position: absolute;
        z-index: 1;
        right: 2%;
        bottom: .8rem;
        font-size: .24rem;
        color: #909090
    }

    .item-list .status-btn {
        font-size: .24rem;
        width: 1.24rem;
        height: .52rem;
        line-height: .52rem;
        text-align: center;
        border: 1px solid #f15353;
        border-radius: 4px;
        position: absolute;
        z-index: 1;
        right: 2%;
        bottom: .2rem
    }

    .total-wrap {
        width: 96%;
        height: .8rem;
        border-bottom: 1px solid #f17f1f;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding-left: 2%;
        padding-right: 2%
    }

    .total-wrap .total {
        font-size: .28rem
    }
</style>