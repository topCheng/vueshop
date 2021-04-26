<template>
    <div class="page">
        <SubHeader title="下单成功"></SubHeader>
        <div class="main">
            <div class="list success">下单成功！</div>
            <div class="list ordernum">订单编号：{{ordernum}}</div>
            <div class="list" @click="$router.push('/user/order')">查看订单</div>
            <div class="pay-btn">去付款</div>
        </div>
    </div>
</template>

<script>
    import SubHeader from "../../../components/subHeader/subHeader"
    import {mapActions} from "vuex"

    export default {
        name: "result",
        data() {
          return {
              ordernum: ""
          }
        },
        components: {
            SubHeader
        },
        created() {
            this.$utils.safeUser(this);
            this.getOrderNumber({
                success: (res) => {
                    //console.log(res);
                    this.ordernum = res.data.ordernum;
                }
            });
        },
        methods: {
            ...mapActions({
                getOrderNumber: "order/getOrderNumber"
            })
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
        margin-top: 1.3rem
    }

    .main .list {
        width: 100%;
        font-size: .32rem;
        text-align: center;
        margin-bottom: .2rem
    }

    .main .list.success {
        color: #e51b19
    }

    .main .list.ordernum {
        color: #f17f1f
    }

    .main .pay-btn {
        width: 3.2rem;
        height: .6rem;
        font-size: .28rem;
        color: #fff;
        text-align: center;
        margin: 0 auto;
        background-color: #0a8ddf;
        line-height: .6rem;
        border-radius: 4px
    }
</style>