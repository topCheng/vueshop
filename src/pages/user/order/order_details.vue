<template>
    <div class="page">
        <SubHeader title="订单详情"></SubHeader>
        <div class="main">
            <div class="ordernum">订单编号：{{orderDetails.ordernum}}</div>
            <div class="address-wrap">
                <div class="skew-wrap">
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                </div>
                <div class="address-info">
                    <div class="name"><img
                            src="data:image/png;base64,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"
                            alt="">{{orderDetails.name}}
                    </div>
                    <div class="cellphone"><img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACKklEQVR4Xu1bS1ICMRB97QzuLHHnAqrgBB5BPIGshFvIDcAbeAxx43gDjiAnEEsWLrVkg3zaCp8qtMBKmCCheLPu9KRfvyT9ZjqCPX9kz+MHASAD9hwBLgGfBNDqaWGkmToUZQiyPn3Pfanq0wGQRPfdGx/+vTFgUM2VZCwPmwr8d7AGiPirdyHJ+3saILwAoOVsdnR49PxfwS+w4SZz321sHYDhVd5Q/sFhIo8mg0vtBWWBnFn66sTN16Kl7YrXpRk9Gzu4yjVEpG7rKup/nqyi7qCSuxXIta2vuPmaisWpBs8n6QoAgA6gneVBSsk2eGO3qwC4xPinLQEIawnoi6qh9+YfETkPbgmoaupjyRa6YSWvBCC0TZAM4BLgHsBNMK044SlgiQCPQdYBLIRYCbIUZikc2AcRagFqAWoBagFqgZR/aiylAKgFqAWoBagFqAWoBagFwvo7TDFEMUQxRDFEMUQxlK5vb6fV4N/dX7ah2dpNu8nYJBVWk5Rt9gAoPqDjWhSNWkPEBVGpAbh08DAx3VkGqOhF5q7bWgx4WMknriDsLADLJr5Gx2kYDFijWRqRDIpy9/ajp9C1TxjQl7jZLbgum0V7L73Cs3b5DgTHtpP53e+/Dog+xJcXAEzQswsTiQsIU7C0BYjJolMmFdqO+71SEBcm5lmfXJkZZ8wFBnN/wJoNtqyZwAVtQ5H4Krm9McAliJBsCUBI2djGXMiAbaAe0jv3ngHfd4ZJXxvzzDgAAAAASUVORK5CYII="
                            alt="">{{orderDetails.cellphone}}
                    </div>
                    <div class="address">{{orderDetails.province+orderDetails.city+orderDetails.area+orderDetails.address}}</div>
                </div>
                <div class="skew-wrap">
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                    <div class="skew"></div>
                </div>
            </div>
            <div class="buy-title">购买的宝贝</div>
            <div class="goods-list" v-for="(item,index) in orderDetails.goods" :key="index" @click="$router.push('/goods/details?gid='+item.gid)">
                <div class="image"><img :src="item.image" alt="">
                </div>
                <div class="goods-info">
                    <div class="title">{{item.title}}</div>
                    <div class="attr">
                        <span class="amount">x {{item.amount}}</span>
                        <span v-for="(item2,index2) in item.param" :key="index2">{{item2.title}}：
                            <span v-for="(item3,index3) in item2.param" :key="index3">{{item3.title}}</span>
                        </span>
                    </div>
                </div>
                <div class="price">¥{{item.price}}</div>
            </div>
            <ul class="order-status">
                <li>支付状态</li>
                <li>{{orderDetails.status==="0"?"待付款":orderDetails.status==="1"?"待收货":"已收货"}}</li>
            </ul>
            <div class="total-wrap">
                <ul class="total">
                    <li>商品总额</li>
                    <li>¥{{orderDetails.total}}</li>
                </ul>
                <ul class="total">
                    <li>+运费</li>
                    <li>¥{{orderDetails.freight}}</li>
                </ul>
            </div>
            <div class="true-total">
                <div class="total">实付金额：<span>¥{{orderDetails.truetotal}}</span></div>
                <div class="order-time">下单时间：{{orderDetails.ordertime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import SubHeader from "../../../components/subHeader/subHeader"
    import {mapActions, mapState} from "vuex"

    export default {
        name: "order_details",
        data() {
            return {
                ordernum: this.$route.query.ordernum ? this.$route.query.ordernum : ""
            }
        },
        components: {
            SubHeader
        },
        computed: {
            ...mapState({
                orderDetails: state => state.order.orderDetails
            })
        },
        created() {
            document.title = this.$route.meta.title;
            this.$utils.safeUser(this);
            this.getOrderDetails({ordernum: this.ordernum});
        },
        methods: {
            ...mapActions({
                getOrderDetails: "order/getOrderDetails"
            }),
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        min-height: 100vh;
        background-color: #fff;
        overflow: hidden
    }

    .main {
        width: 100%;
        padding-top: 1.02rem
    }

    .ordernum {
        width: auto;
        height: auto;
        font-size: .28rem;
        padding-left: 2%;
        padding-top: .2rem
    }

    .address-wrap {
        width: 100%;
        margin-top: .4rem
    }

    .address-wrap .skew-wrap {
        width: 100%;
        height: .08rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between
    }

    .address-wrap .skew-wrap .skew {
        width: 5%;
        height: 100%;
        transform: skew(-40deg, 0deg);
        -webkit-transform: skew(-40deg, 0deg);
        background-color: #a2dafb
    }

    .address-wrap .address-info {
        width: 100%;
        height: 2rem;
        background-color: #fffaf0;
        position: relative;
        z-index: 1
    }

    .address-wrap .address-info .name {
        width: auto;
        height: auto;
        position: absolute;
        z-index: 1;
        left: 2%;
        top: .3rem;
        font-size: .28rem
    }

    .address-wrap .address-info .cellphone img, .address-wrap .address-info .name img {
        width: .4rem;
        height: .4rem;
        vertical-align: middle
    }

    .address-wrap .address-info .cellphone {
        width: auto;
        height: auto;
        position: absolute;
        right: 10%;
        top: .3rem;
        font-size: .28rem
    }

    .address-wrap .address-info .address {
        width: 95%;
        height: .8rem;
        overflow: hidden;
        font-size: .28rem;
        position: absolute;
        z-index: 1;
        left: 2%;
        top: 1.2rem;
        color: #848689
    }

    .buy-title {
        height: .8rem;
        font-size: .28rem;
        line-height: .8rem
    }

    .buy-title, .goods-list {
        width: 100%;
        border-bottom: 1px solid #efefef;
        padding-left: 2%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box
    }

    .goods-list {
        height: 1.6rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        padding-right: 2%
    }

    .goods-list .image {
        width: 1.2rem;
        height: 1.2rem
    }

    .goods-list .image img {
        width: 100%;
        height: 100%
    }

    .goods-list .goods-info {
        width: 65%;
        height: auto
    }

    .goods-list .price {
        font-size: .28rem
    }

    .goods-list .goods-info .title {
        width: 100%;
        height: .8rem;
        font-size: .28rem
    }

    .goods-list .goods-info .attr {
        width: 100%;
        height: auto;
        font-size: .24rem;
        margin-top: .2rem
    }

    .goods-list .goods-info .attr .amount {
        color: #848689
    }

    .goods-list .goods-info .attr span {
        padding-right: .3rem
    }

    .order-status {
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
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        font-size: .28rem;
        padding-left: 2%;
        padding-right: 2%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box
    }

    .total-wrap {
        width: 100%;
        height: 1.4rem;
        border-bottom: 1px solid #efefef
    }

    .total-wrap .total {
        width: 100%;
        height: auto;
        font-size: .28rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        padding-left: 2%;
        padding-right: 2%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        margin-top: .3rem
    }

    .total-wrap .total li:nth-child(2) {
        color: #f15353
    }

    .true-total {
        width: 100%;
        height: 1rem
    }

    .true-total .total {
        width: auto;
        text-align: right;
        font-size: .28rem;
        padding-right: 2%;
        margin-top: .2rem
    }

    .true-total .total span {
        color: #f15353
    }

    .true-total .order-time {
        width: auto;
        text-align: right;
        font-size: .24rem;
        padding-right: 2%;
        margin-top: .1rem;
        color: #848689
    }
</style>