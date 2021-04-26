<template>
    <div class="page">
        <SubHeader title="选择收货地址"></SubHeader>
        <div class="main">
            <div class="address-nav">
                <div class="address-nav-name-1">配送地址</div>
                <div class="address-nav-name-2" @click="$router.push('/address/add')">+添加收货地址</div>
            </div>
            <template v-show="address.length>0">
                <div class="address-list" v-for="(item, index) in address" :key="index" @click="selectAddress(item.aid)">
                    <div class="address-info-wrap">
                        <div class="check-mark" v-if="item.isdefault === '1'? true : false"></div>
                        <div :class="{'address-info':true, 'default':item.isdefault ==='1'? true : false}">
                            <div class="person">
                                <span>{{item.name}}</span>
                                <span>{{item.cellphone}}</span>
                            </div>
                            <div class="address">
                                <span class="default" v-if="item.isdefault === '1'? true : false">默认</span>
                                <span class="text">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="handle-wrap">
                        <div class="edit" @click.stop="$router.push('/address/modify?aid='+item.aid)"></div>
                        <div class="del" @click.stop="delAddress(index,item.aid)"></div>
                    </div>
                </div>
            </template>
            <div class="no-data" v-show="address.length<=0">您还没有添加收货地址！</div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    import SubHeader from "../../../components/subHeader/subHeader"
    import {mapActions, mapState, mapMutations} from "vuex"
    import {Dialog} from "vant"

    Vue.use(Dialog)

    export default {
        name: "selectAddress",
        components: {
            SubHeader
        },
        created() {
            this.$utils.safeUser(this);
            this.getAddress();
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        computed: {
            ...mapState({
                address: state => state.address.address
            })
        },
        methods: {
            ...mapActions({
                getAddress: "address/getAddress",
                asyncdelAddress: "address/delAddress"
            }),
            delAddress(index, aid) {
                Dialog.confirm({
                    message: "确定要删除吗?",
                }).then(() => {
                    this.asyncdelAddress({index: index, aid: aid});
                }).catch(() => {
                    // on cancel
                });
            },
            selectAddress(aid) {
                sessionStorage["addsid"] = aid;
                this.$router.go(-1);
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
        margin-top: 1rem
    }

    .main .address-nav {
        width: 100%;
        height: .8rem;
        background-color: #d3c6be;
        font-size: .32rem;
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
        -webkit-align-items: center
    }

    .main .address-nav .address-nav-name-1 {
        margin-left: .2rem
    }

    .main .address-nav .address-nav-name-2 {
        margin-right: .2rem
    }

    .main .address-list {
        width: 100%;
        height: 2.22rem;
        border-bottom: 1px solid #c6c6c6
    }

    .main .address-list .address-info-wrap {
        width: 90%;
        height: 1.42rem;
        border-bottom: 1px dashed #c6c6c6;
        margin: 0 auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center
    }

    .main .address-list .address-info-wrap .check-mark {
        width: .4rem;
        height: .4rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACQ0lEQVRoQ+2Y0XHaQBCG/z05kR5dAiWQDiiBDgIvCbw5FQRXkMkTOC8mFXhSgScV2O4gJcRv0hi0mZNNImGhvZNOymlGPDHopPu/3Vv9uxB6/qGe68cA8L8zOGRgyECNCPA1ztMk+qLC+FMvj9BuE90SMGHGz94B7DfRNYAZwI9KpZNeAfwTDzBjfraMt70B2K2jGRF09P+K1997AZAXD8ZlsIxXh9r3HoC/vRmnaXCXCWZ8D5bxLP/i8hrgWby6Bei8TLzXR4jX0SglvsvEgx9UmExojt/HtuFlBp6NKtSRH1eJ9zIDR+IfVZiMyiLvbRG/MqoPT/dV3YZXR8hWvFdHaL+OViB8PjYqqdfzIgOnXFYS70UG+OrtNGV182JUBZc1BtDvXFrGv0xucLnGxKik/eiQvkN3J93g6roL8dkR2q+jLQjvbYunCcjLRKX7m5FkVNI+WRF3CWHjspL4QhF3BXEYB7OJimnctPYKr9G2IeoYlZSFVz7QFkR+HFRq/46EFkESXtkL5SFAWAUf40vTB5ata2JU0r4nnbgAAWyDRTyXHta1eNGJC7NoDYjCOAj+GiySizpBaNSN1oVwZVQSsFEzZwuRHwcZ/ONskUwlIXWvGwHoh5tCuDYqCcwYwASia/FiEUtvFRwV9m4T3hBo6splpejXAjiViTZctjWAEgg9S4z07y5dtlWAEojCn64mm7tYY1XEVTXR9UBU2QvZRkablqvmzHbvxhmw3dD1+gHAdURtnzdkwDZirtf3PgN/AP7baxeg2XdZAAAAAElFTkSuQmCC);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-right: .3rem
    }

    .main .address-list .address-info-wrap .address-info.default {
        width: 90%
    }

    .main .address-list .address-info-wrap .address-info {
        width: 100%;
        height: auto
    }

    .main .address-list .person {
        width: 100%;
        height: .5rem;
        border-bottom: 1px solid #efefef;
        font-size: .28rem;
        overflow: hidden
    }

    .main .address-list .person span:first-child {
        margin-right: .2rem
    }

    .main .address-list .address {
        width: 100%;
        height: .6rem;
        overflow: hidden;
        line-height: .6rem;
        margin-top: .1rem;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .main .address-list .address .text {
        font-size: .32rem
    }

    .main .address-list .address .default {
        padding: .05rem .1rem;
        background-color: #fdb709;
        color: #fff;
        font-size: .24rem;
        border-radius: 4px;
        margin-right: .2rem
    }

    .main .address-list .handle-wrap {
        width: 100%;
        height: .76rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center
    }

    .main .address-list .handle-wrap .edit {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACW0lEQVRoQ+2aT5LSQBSH34+VIFPOEYa1kmKWwEL+XGCOEE4wegLxBHoDmRNYHiBEF4QlSLRcoieQqbJKF8qzkqrRxKSSTro7CVbYUfR7/X3dTXjdDejEXzhxfooV2G/s828/6Jr42CPCuWpJAItH/fGNirwRgY8ru/eL2AZIOXgQuMG4fDgcb2UlIgLuarkhUE82cVo8g2dGf7pIa5f2eUjAXzrf+WtakILP37WbuOpcjg+yuUIC7toeEbMdTArip/ebjYWKzmRg3bX9jJlNEG/bzcbsjidRgJneGMPJlUzHKmJ3K+sVAPNPLubn3eF07r1PnoFAQxUgeXJE4L0kpyIQD0/v2y2MhJZQ0DTP6MnEiMBXdgmJwldSIAt85QSywldKIA98ZQTywldCQAa+dAFZ+FIFVMCXJqAKvhQBlfCFC6iGL1RAB3xhArrgCxHQCa9dwHWsl0S4DpXVHK7nZUpurQKf1vbFT+a9TvhiBQRH3j+XAr/24YBZtz9+mzRLWvfEu7VlgmnOjO1ZC6bIyYbrLD3gx/7Wl+izMZh0ShPIs76DAl58dzBJPL/VOgO1QD0DJRxs1d+B0OFuPQPZn0P1EgouISa6MQaTv8fa2Qc0c8TOWe5BdHEXKPVDxkyHsxY6IiVAZtKYgLgLlkwCXiF1BG+CuT0JgKQv4wQFR6G+iW+NwTTxsjFSZ+wc6wDCA8EOtTYTuSGKCHxwrCdMeKGVTDC5yFVsbKXnSRyJ5uXNBH8hNMy0vUBkQ/PvwPi7qsATQXDgpJq179E2y0Pj//yvhNQQFhx88jPwG11LY08Lv2+CAAAAAElFTkSuQmCC)
    }

    .main .address-list .handle-wrap .del, .main .address-list .handle-wrap .edit {
        width: .4rem;
        height: .4rem;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-right: .3rem
    }

    .main .address-list .handle-wrap .del {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADH0lEQVRoQ+1ZTU7bUBD+xgWpRVSlJ2hYVpXTsMRZND8HKJwAOEHpCYAbwAlITwA9AHFYJFmSYlVdNpygoFa0Uit/le0ktR2TPNsJFdLzyouZ975vZt68eTOCB/7JA8cPTcDz4JeuXfjtunsCKUFQmuLVFsn+omEcvFyv9vNGQG4PXHbPtoVynAUIhTvF9Xoji+5QJxcBp2tXQNojAMQnCK4nAiJWIHg9khGpmuvVVlYS+Qh0mh74ir95CiCXHXtDwJMB6JZp1aozJ/D1wl758QvvSG4LUMi6QR49An0RaSw/xtHqWjXRs4ke8A8laf8v4GOkid6CIZtJhz6RgNNuXvzLJrwCJHe2yOYJFgB54esSPbNcW4uvM0YgHJ8kPj5dku273JcNlLqWF8bfb9kQwduAg2wWreppeIUxAk77bB8ie57QgsjqLHK1OuRxyc9tu+QKLwIv8MAs1/eVCQDInN7ygE7QDTKdEoGuXRlknq0Zg8i1HIEPXkaK3xmJh3jgtsMg7lgSyLPB7ue5UKgrvxnsfSOQnvdvUHZflav+/8QQigs4naYXRv6CplXLdfGp4nc6TQ4NZlq1IHzu+KYC0gRUzR6S0x4IG20YQgRvilZ9JYNBU6vMywPn8QPldM5OQCkk1Sl+MfgzqDiXn8hm/Db36q0/Lk8obBWt+vuY0eZyiCMEpt2QkbdCQqkdvvENylo4Rd6LByIAE27INATibwlNIOkQA4iEkPZAqOrVITQpUYdKCR1CkbOlQygwR5pqVIeQDqGEbKNDyDeKroWiHep7KeY8wzvtZo/CwiMalXjHIOivun4XYVGMUrxB5tVSpHsqlL5ZrkWGIvdGIPVTS1FBE1AppxWNmUlsph647DQbAmyRuC6Wa88zIUqhNHhLfwtUeGRa9d1J6lPvgfAQj2SjWK7vpMCTSjQA7x4DsuHDVxgCTiUwzDbDwZw/9gHmMvAgUBhNhYhP8eyUZA0lAkEHwj0dTUtS2TWLMK8MGhtJzdz4akoEPCXfvbfuLkS8Zqvf7J3Ddw6ytbxkHKpOhZQJzAHsTJbUBGZixhyL/AXhwTVeTDOkjwAAAABJRU5ErkJggg==)
    }
</style>