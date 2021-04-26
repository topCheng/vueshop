<template>
    <div>
        <div class="order-list" v-for="(item, index) in myOrders" :key="index"  @click="$router.push('/user/order/details?ordernum='+item.ordernum)">
            <div class="ordernum-wrap">
                <div class="ordernum">订单编号：{{item.ordernum}}</div>
                <div class="status">{{item.status==="0"?"待付款":item.status==="1"?"待收货":"已收货"}}</div>
            </div>
            <div class="item-list" v-for="(item2, index2) in item.goods" :key="index2">
                <div class="image"><img :data-echo="item2.image" src="../../../assets/images/common/lazyImg.jpg" alt="">
                </div>
                <div class="title">{{item2.title}}</div>
                <div class="amount">x {{item2.amount}}</div>
            </div>
            <div class="total-wrap">
                <div class="total">实付金额：¥{{item.total}}</div>
                <div class="status-wrap">
                    <div class="status-btn" v-if="item.status=='0'" @click.stop="cancelOrder(index,item.ordernum)">取消订单</div>
                    <div class="status-btn" @click.stop="handleOrder(index,item)">
                        {{item.status=='0'?"去付款":item.status==="1"?"确认收货":"已收货"}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex"
    import UpRefresh from "../../../assets/js/libs/uprefresh"
    import Vue from "vue"
    import {Dialog} from "vant"

    Vue.use(Dialog)

    export default {
        name: "order-list",
        data() {
            return {
                status: this.$route.query.status ? this.$route.query.status : "all"
            }
        },
        methods: {
            ...mapActions({
                myOrder: "order/myOrder",
                myOrderPage: "order/myOrderPage",
                asynccancelOrder: "order/cancelOrder",
                confirmOrder: "order/confirmOrder"
            }),
            getData() {
                this.myOrder({
                    status: this.status, page: 1, success: (pageNum) => {
                        this.$nextTick(() => {
                            this.$utils.lazyImg();
                        });
                        this.pullUp.init({
                            "curPage": 1,
                            "maxPage": parseInt(pageNum),
                            "offsetBottom": 100
                        }, (page) => {
                            //console.log(page);
                            this.myOrderPage({
                                status: this.status, page: page, success: () => {
                                    this.$nextTick(() => {
                                        this.$utils.lazyImg();
                                    });
                                }
                            });
                        });
                    }
                });
            },
            cancelOrder(index, orderNum) {
                Dialog.confirm({
                    message: "确定要取消订单吗?",
                }).then(() => {
                    this.asynccancelOrder({ordernum: orderNum, index: index});
                }).catch(() => {
                    // on cancel
                });
            },
            handleOrder(index, item) {
                if (item.status == "1") {//确认收货
                    this.confirmOrder({ordernum: item.ordernum, index: index, status: "2"});
                }
            }
        },
        computed: {
            ...mapState({
                myOrders: state => state.order.myOrders
            })
        },
        created() {
            this.pullUp = new UpRefresh();
            this.getData();
        },
        beforeDestroy() {
            this.pullUp.uneventSrcoll();
        },
        beforeRouteUpdate(to, from, next) {
            this.status = to.query.status;
            this.getData();
            next();
        }
    }
</script>

<style scoped>
    .order-list {
        width: 100%;
        height: auto
    }

    .order-list .ordernum-wrap {
        width: 96%;
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
        height: 1.6rem;
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
        bottom: .2rem;
        font-size: .24rem;
        color: #909090
    }

    .total-wrap {
        width: 100%;
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

    .total-wrap .status-btn {
        font-size: .24rem;
        width: 1.24rem;
        height: .52rem;
        line-height: .52rem;
        text-align: center;
        border: 1px solid #f15353;
        border-radius: 4px;
        margin-left: .2rem
    }

    .total-wrap .status-wrap {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: auto;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end
    }
</style>