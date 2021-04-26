<template>
    <div class="page">
        <SubHeader :title="headTitle"></SubHeader>
        <OrderTags :status="status"></OrderTags>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import SubHeader from "../../../components/subHeader/subHeader"
    import OrderTags from "../../../components/order_tags/order_tags"

    export default {
        name: "order",
        data() {
            return {
                status: this.$route.query.status ? this.$route.query.status : "all",
                headTitle: "全部订单",
                allActive: true,
                paidActive: false,
                receivedActive: false,
                evaluatedActive: false
            }
        },
        components: {
            SubHeader,
            OrderTags
        },
        mounted() {
            this.getTitle();
        },
        methods: {
            getTitle() {
                switch (this.status) {
                    case "all":
                        this.headTitle = "全部订单"
                        document.title = this.headTitle;
                        break;
                    case "0":
                        this.headTitle = "待付款"
                        document.title = this.headTitle;
                        break;
                    case "1":
                        this.headTitle = "待收货"
                        document.title = this.headTitle;
                        break;
                    case "2":
                        this.headTitle = "待评价"
                        document.title = this.headTitle;
                        break;
                    default:
                        this.headTitle = "全部订单"
                        document.title = this.headTitle;
                        break;
                }
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.status = to.query.status;
            this.getTitle();
            next();
        },
        created() {
            this.$utils.safeUser(this);
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        min-height: 100vh;
        background-color: #fff
    }

    .main {
        width: 100%;
        padding-top: 1.9rem
    }
</style>