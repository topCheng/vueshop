<template>
    <div class="page">
        <SubHeader title="确认订单"></SubHeader>
        <div class="main">
            <div class="address-wrap" @click="$router.push('/address')">
                <div class="persion-info" v-show="name?true:false">
                    <span>收货人：{{name}}</span>
                    <span>{{cellphone}}</span>
                </div>
                <div class="address" v-show="name?true:false">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD5ElEQVRoQ9WZgbFNQQyG8ypABagAFaACVIAKUAEqQAWoABWgAlSAClAB85nExHHP5s85e9+MzNx53rVnN3/+5E/2vBP7z+1ksv8XzOyGmZ01M/7NB/toZt/988bMvsw6dwYAnL1tZnfM7LLoGIBemNlLByU+9u+yPQBw/J6Z3feIx+4/UsRxFAMY6/l5JrkBK0/N7NlWIFsB4MirlCI4TURfm9m7IpzXzOymMxZgSKlbDrzFxhYApMpzPwXHiSAfotkxGIG9h/4Qzz/wQMj7dAFw4BPf/ZNHMdJEPnSxEDZh75J/f7cDogMA2kkbDCWBiW7U10DCBul31ReQTvxemgqAKL31QiTyqtqUDiwWwCZMEJjrSk2oAHCe4vvqzs+K/BIgTADivIsBIIamAMhFy4aVylRnVv9PoAgYVtaDAuCzyyVNBzCnYeQ/HR15vTg6sAKQC5eNOiMABUk0MVh730DOCELgsGFBVwCQN8YEVAcwirGOPkE+Z6NuSAlJXRw0QRgyXwH45o7QYGhWlbGG8SKMoscoyrDHZvao2sibHD1nmEYjAEjlBz9ISZ9cfKQL9RIpR0rAZui8IgY5ja6sSeoIQHaoYgqcIbWjPhE6T02UEmlmPz2Aq4BHjoV8kgYx14+Yj8NGRZdFQQkKdcPAt7rnaBPylEGLdAg1WQOQ2To3GDEobOoKU9IIpki71bpRAEA7OTgyKV89ENGklLqiBqnFVRGZWQNB90hlgtVuWm6qATWqwUw4t5YeOc0UKZXSsiokZBANVw4kv8nZmOuRzXyljDEElcK5aiCMnjKcfisAEdVyJnEaliCWdaM6z3Mxgw2baAUgp5GiGuEw0UYy494AE4wQsKKYPINVADgspExtPoqD1ZpoiuUMpgDIxdRhoXJS6SnleQqA02YhtF9poKYCyCzIF+4NFLRvfyoAfMm3JDpzJYNd/1EwlIef8u2vAwBFQk0YrpS+0AUQus/LMtRLuv11AOBQ7rarM3rX88WM1ApOFwC+xUyvDHkKFlKGwoXh9junLQDyTa0VrRU0+RraZnULgJmplNVNvXf/FYetAHJvoNi2qFJWHUnzDzG4B0BWJWYcXpl0LMYFVIe9NsnyHgA4m4eu8jVgQlfdHeRA7AXAQVGE6hvl7sVmCGYGgE49kCpIJvlfTpoKDbMA5IvM2tjNGvIeGe5cbE6FAQ7BMZxn1DhU1Px1h5rZVbRLNLMYiH0ziKzrvOxl0sR5amDv39X+4JgN4JAy8R0ApjvPxscAwL55rud3nOc79dW6Ur+/1xwLQDARl/ipaZPRHRMA58RLYWm2l8OeFh4bwBafWs/8AnfL9zFGfAHRAAAAAElFTkSuQmCC"
                         alt="收货地址">
                    <span>{{province}} {{city}} {{area}} {{address}}</span>
                </div>
                <div class="address-null" v-show="name?false:true">您的收货地址为空,点击添加收货地址</div>
                <div class="arrow"></div>
                <div class="address-border-wrap">
                    <div class="trapezoid style1"></div>
                    <div class="trapezoid style2"></div>
                    <div class="trapezoid style1"></div>
                    <div class="trapezoid style2"></div>
                    <div class="trapezoid style1"></div>
                    <div class="trapezoid style2"></div>
                    <div class="trapezoid style1"></div>
                    <div class="trapezoid style2"></div>
                    <div class="trapezoid style1"></div>
                    <div class="trapezoid style2"></div>
                </div>
            </div>
            <div class="goods-wrap">
                <div class="goods-list" v-for="(item,index) in newCartData" :key="index">
                    <div class="image"><img :src="item.img" alt=""></div>
                    <div class="goods-param">
                        <div class="title">{{item.title}}</div>
                        <div class="attr">
                            <span v-for="(item2,index2) in item.attrs" :key="index2">{{item2.title}}：
                                <template v-for="(item3, index3) in item2.param">{{item3.title}}</template>
                            </span>
                        </div>
                        <div class="amount">x {{item.amount}}</div>
                        <div class="price">￥{{item.price}}</div>
                    </div>
                </div>
            </div>
            <ul class="total-wrap">
                <li>商品总额</li>
                <li>￥{{total}}</li>
            </ul>
            <ul class="total-wrap">
                <li>运费</li>
                <li>￥{{freight}}</li>
            </ul>
        </div>
        <div class="balance-wrap">
            <div class="price-wrap">
                <span>实际金额：</span><span>￥{{parseFloat(total)+parseFloat(freight)}}</span>
            </div>
            <div class="balance-btn" @click="submitOrder()">提交订单</div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapGetters} from "vuex"
    import SubHeader from "../../../components/subHeader/subHeader"

    export default {
        name: "order",
        data() {
            return {
                aid: sessionStorage["addsid"],
                name: "",
                cellphone: "",
                province: "",
                city: "",
                area: "",
                address: ""
            }
        },
        components: {
            SubHeader
        },
        created() {
            this.$utils.safeUser(this);
            this.isSubmit = true;
            if (this.aid) {
                this.getAddressInfo({
                    aid: this.aid,
                    success: (res) => {
                        //console.log(res);
                        if (res.code === 200) {
                            this.name = res.data.name;
                            this.cellphone = res.data.cellphone;
                            this.province = res.data.province;
                            this.city = res.data.city;
                            this.area = res.data.area;
                            this.address = res.data.address;
                        }
                    }
                })
            } else {//默认收货地址
                this.getDefaultAddress({
                    success: (res) => {
                        //console.log(res);
                        sessionStorage["addsid"] = res.data.aid;
                        this.name = res.data.name;
                        this.cellphone = res.data.cellphone;
                        this.province = res.data.province;
                        this.city = res.data.city;
                        this.area = res.data.area;
                        this.address = res.data.address;
                    }
                });
            }

        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        computed: {
            ...mapState({
                cartData: state => state.cart.cartData
            }),
            ...mapGetters({
                total: "cart/total",
                freight: "cart/freight"
            }),
            newCartData() {//v-for与v-if不要出现在同一个标签
                if (this.cartData.length > 0) {
                    let data = this.cartData.filter(item => {
                        return item.checked;
                    });
                    return data;
                } else {
                    return [];
                }
            }
        },
        methods: {
            ...mapActions({
                getAddressInfo: "address/getAddressInfo",
                getDefaultAddress: "address/getDefaultAddress",
                addOrder: "order/addOrder"
            }),
            submitOrder() {
                if (this.isSubmit) {
                    this.isSubmit = false;
                    if (this.total > 0) {
                        this.addOrder({
                            freight: this.freight,
                            addsid: sessionStorage["addsid"],
                            goodsData: JSON.stringify(this.cartData),
                            success: (res) => {
                                //console.log(res);
                                if (res.code === 200) {
                                    this.$router.push("/order/result");
                                }
                            }
                        });
                    }
                }
            }
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
        margin-top: 1.4rem;
        margin-bottom: 1.4rem
    }

    .address-wrap {
        width: 100%;
        height: 1.9rem;
        position: relative;
        z-index: 1
    }

    .address-wrap .address-border-wrap {
        width: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex
    }

    .address-wrap .address-border-wrap .trapezoid {
        width: 6%;
        margin-left: 1%;
        margin-right: 1%
    }

    .address-wrap .address-border-wrap .trapezoid.style1 {
        border-bottom: .08rem solid #fdcd4d;
        border-left: .08rem solid transparent;
        border-right: .08rem solid transparent
    }

    .address-wrap .address-border-wrap .trapezoid.style2 {
        border-top: .08rem solid #84614d;
        border-left: .08rem solid transparent;
        border-right: .08rem solid transparent
    }

    .address-wrap .persion-info {
        width: auto;
        height: auto;
        position: absolute;
        z-index: 1;
        left: .4rem;
        top: 0;
        font-size: .28rem;
        font-weight: 700
    }

    .address-wrap .persion-info span:first-child {
        padding-right: 1rem
    }

    .address-wrap .address {
        width: auto;
        height: auto;
        position: absolute;
        z-index: 1;
        left: .4rem;
        top: .9rem
    }

    .address-wrap .address img {
        width: .4rem;
        height: .4rem;
        vertical-align: middle;
        margin-right: .1rem
    }

    .address-wrap .address span {
        font-size: .24rem
    }

    .address-wrap .arrow {
        width: .32rem;
        height: .32rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACFElEQVR4Xu3b3TEEQRQF4LMREIIMCGFFgAgQgRCsDGSACBABIRCJlYE6VT1VXW3e9v6cWzP9ojyYrfPtvd3TM22DhY/NwvNjBVgrwEbgFcAZgCsAXzaXjLmKVQvsARwB4M/zSghWAPz2PysiWAGwXksiWAKURLAGKIfgATCHwNWBc4Tc8AIYEfj7LYBnNQFPgBII3gDyCBEARDgB8AbgtLWATDtEATD3cZsIpRAiASQRogHkEDIA5hB2AB4ylsgsgDkE3iNwcgwdmQASCNkA6QgKABMCW+Ci1X9YO6gATH3P4NeRCGoAzB6KoAgQiqAKMCJwH8Elkg9dTYcywIjAx+184myKoA7gjlABwBWhCgARuF+4bxOAWTtUAmD2GwBPDeEdwOWhM2I1gDsAj0sF4DfPCuD4BrC1WBGqVIBLeEpWAHALXwHANbw6QB+eMz773/QuUBmgD//STX6Hrnr//l5xDggLr1gBoeGVAPjWiAetuLZzuJZ93wcKLcDwH+2ITWh4hQpIDZ8NkB4+E2AMz9di3O6Gj4w5YAyfelYgGkAqfHQLyIWPBOARmelANT83teyj7wN4hJbrPCtAKnxEBUiH9waQD+8J0If/bU9vF3NUdgzPDY7sf5FY3weUCm/dAuXCWwKUDG8J8NPWeU540j0/7ras5gAeYGAV8F2d7IQ3t9W0Agjfxlp94ApgJVn1OouvgD9e14ZBa8OFNwAAAABJRU5ErkJggg==);
        background-size: 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 1;
        right: .2rem;
        top: .6rem
    }

    .address-wrap .address-null {
        width: auto;
        height: auto;
        font-size: .28rem;
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        display: table;
        margin-top: .5rem;
        white-space: nowrap
    }

    .goods-wrap {
        width: 100%;
        margin-top: .4rem;
        overflow: hidden
    }

    .goods-wrap .goods-list {
        width: 92%;
        height: 2rem;
        margin: 0 auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        margin-bottom: .4rem
    }

    .goods-wrap .goods-list .image {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: .3rem
    }

    .goods-wrap .goods-list .image img {
        width: 100%;
        height: 100%
    }

    .goods-wrap .goods-list .goods-param {
        width: 75%
    }

    .goods-wrap .goods-list .goods-param .title {
        width: 100%;
        height: .4rem;
        overflow: hidden;
        font-size: .28rem;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .goods-wrap .goods-list .attr {
        width: 100%;
        height: .4rem;
        font-size: .28rem;
        margin-top: .1rem;
        color: #868686
    }

    .goods-wrap .goods-list .attr span {
        padding-right: .3rem
    }

    .goods-wrap .goods-list .amount {
        font-size: .24rem;
        color: #868686;
        margin-top: .1rem
    }

    .goods-wrap .goods-list .price {
        font-size: .28rem;
        color: #f51d2a;
        margin-top: .1rem;
        margin-left: -.07rem
    }

    .total-wrap {
        width: 92%;
        margin: 0 auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        font-size: .32rem;
        margin-bottom: .3rem
    }

    .total-wrap li:first-child {
        color: #787878
    }

    .total-wrap li:nth-child(2) {
        color: #f51d2a
    }

    .balance-wrap {
        width: 100%;
        height: 1rem;
        border-top: 1px solid #efefef;
        position: fixed;
        z-index: 5;
        left: 0;
        bottom: 0;
        background-color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex
    }

    .balance-wrap .price-wrap {
        -webkit-box-flex: 2;
        -ms-flex: 2;
        flex: 2;
        -webkit-flex: 2;
        text-align: right;
        line-height: 1rem;
        padding-right: .2rem;
        font-size: .32rem
    }

    .balance-wrap .price-wrap span:nth-child(2) {
        color: #f51d2a
    }

    .balance-wrap .balance-btn {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-flex: 1;
        background-color: #cc0004;
        font-size: .32rem;
        color: #fff;
        line-height: 1rem;
        text-align: center
    }
</style>