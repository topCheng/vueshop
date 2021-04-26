<template>
    <div class="cart-main">
        <sub-header title="购物车" :isBack="$route.query.from==='goods_details'? true: false"></sub-header>
        <!--<SubHeader></SubHeader>-->
        <div class="cart-list" v-for="(item, index) in cartData" :key="index">
            <div :class="{'select-btn':true, active:item.checked}" @click="selectItem(index)"></div>
            <div class="image-wrap">
                <div class="image">
                    <img :src="item.img">
                </div>
                <div class="del" @click="deleteItem(index)">删除</div>
            </div>
            <div class="goods-wrap">
                <div class="goods-title">{{item.title}}</div>
                <div class="goods-attr">
                    <span v-for="(item2,index2) in item.attrs" :key="index2">{{item2.title}}：
                        <template v-for="(item3, index3) in item2.param">{{item3.title}}</template>
                    </span>
                </div>
                <div class="buy-wrap">
                    <div class="price">¥{{item.price}}</div>
                    <div class="amount-input-wrap">
                        <div :class="item.amount > 1 ? 'btn dec':'btn dec active'" @click="DEC_AMOUNT({index: index})">
                            -
                        </div>
                        <div class="amount-input">
                            <input type="tel" :value="item.amount"
                                   @input="SET_AMOUNT({index: index, amount: $event.target.value})">
                        </div>
                        <div class="btn inc" @click="INC_AMOUNT({index: index})">+</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="orderend-wrap">
            <div class="select-area">
                <div class="select-wrap" @click="allSelect()">
                    <div :class="{'select-btn':true, active:isAllSelect}"></div>
                    <div class="select-text">全选</div>
                </div>
                <div class="total">
                    运费：<span>¥{{freight}}</span>
                    合计：<span>¥{{total}}</span>
                </div>
            </div>
            <div :class="total > 0 ? 'orderend-btn' : 'orderend-btn disable'" @click="settlement()">去结算</div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from "vuex"
    import SubHeader from "../../../components/subHeader/subHeader"

    export default {
        name: "cart",
        data() {
            return {
                isAllSelect: false
            }
        },
        created() {
            this.isAllChecked();
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        components: {
            SubHeader
        },
        computed: {
            ...mapState({
                cartData: state => {
                    return state.cart.cartData;
                    //console.log(state.cart.cartData)
                }
            }),
            ...mapGetters({
                total: "cart/total",
                freight: "cart/freight"
            })
        },
        methods: {
            ...mapMutations({
                DELETE_ITEM: "cart/DELETE_ITEM",
                SET_AMOUNT: "cart/SET_AMOUNT",
                INC_AMOUNT: "cart/INC_AMOUNT",
                DEC_AMOUNT: "cart/DEC_AMOUNT",
                SELECT_ITEM: "cart/SELECT_ITEM",
                ALL_SELECT_ITEM: "cart/ALL_SELECT_ITEM"
            }),
            deleteItem(index) {
                this.DELETE_ITEM({index: index});
                this.isAllChecked();
            },
            //选择商品
            selectItem(index) {
                this.SELECT_ITEM({index: index});
                this.isAllChecked();
            },
            //点击全选
            allSelect() {
                if(this.cartData.length>0) {
                    this.isAllSelect = !this.isAllSelect;
                    this.ALL_SELECT_ITEM({checked: this.isAllSelect});
                }
            },
            //检测是否全选
            isAllChecked() {
                if (this.cartData.length > 0) {
                    let isChecked = true;
                    for (let i = 0; i < this.cartData.length; i++) {
                        if (!this.cartData[i].checked) {
                            isChecked = false;
                            break;
                        }
                    }
                    this.isAllSelect = isChecked;
                } else {
                    this.isAllSelect = false;
                }
            },
            settlement() {//去结算
                if(this.total > 0) {
                    this.$router.push("/order");
                }
            }
        },
    }
</script>

<style scoped>
    .cart-main {
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 2.2rem
    }

    .cart-main .cart-list {
        width: 100%;
        height: 2.2rem;
        background-color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        margin-top: .1rem
    }

    .cart-main .cart-list .select-btn {
        width: .4rem;
        height: .4rem;
        border: 1px solid #efefef;
        border-radius: 100%;
        margin-left: .2rem;
        margin-right: .3rem
    }

    .cart-main .cart-list .select-btn.active {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFF0lEQVR4Xu2bTXbbNhDHZ+iQ2jSts8t7jVR7U0ur2ieIfAIrJ4hygsgnSHyC6AZxT2D5BFFOUGUluRsrUvtel7K9SYmK0wdKek8W8UUQpOjncCkCxPx/HGAGAwrhkV/4yPXDdwDb9IA/f/YP+fi//s0G27Ijdw8YPoc9L/BfAkGTAPYA4RAAd8WCaQYEAwQYA0I/Ctnnxj8wzhNOLgC4aAz8EwDsABed7RoDUJdCdpkHDKcAuEuTB28JsZ1Ns7g3Ep1HjJ25BOEEQPzG/eADILTyEJ54JkGPWHjqAkRmAFe14B0BdeTzOi8kNEPA7sEkPMsygjWA613Y/fepfwGIzSwGZO5L1K/csVf7M5jZPMsKAJ/r0Q58Kv6tyyTSzJvDsU04TQ2gfOJXUOwgpAJQXvH2EIwBlF+8HQQjAPGC92Pwh4OkxmadsukzrtyGRyYLoxGAUTW4KCzG28gV9SHo1afhK93jtABGNZ/H+A+6B5XxPhG9aUzZuco2JYCF6/vX5Ql3Osx0Q4Bdj+aDCLwWIpxUbtm+aiooAQyr/jkivtYNW477dOPNobmeC3D7uW2NKZPuTaQAFju64Loc4nRWJMXzHlfVnRbhzgWF4b5s3yAH8GDevlg8BzB64XfBw7dE9LvMC4QAHs7cl4sfVv02In5c+A7N6hP2TORHQgD3O+vcb1v3TcUvEUgighDAqBr0AOFkW9K04xJ98SJoizY/0pdHcFmfhol6hRhALSCtEdtqQPSlcseaotCm89z6JEzoTfwwfPGkiZ73aVv6lONmEB+vBFF03Pjrv/76GEkAteA9ArwrHYCM4mMAAGeNSfheDaCM4c+B+BiAIBwmPaDq9xHxpdoV4RKIxuRhCwF+ydVbHIlfAvjcmLJ7JbwEgFEtzv6ktfz1DcayLtgHxN9ygaAQf1X1P6Yvv9OgPmFHyikw0kSAzZU0NwjOxS9kb9ov8gBlCKzchs82QxCH8O2p33W2ccpJvBMA/HTmYMreiFzeye4xR/FOAPCH5AaB4LJyF7ZFSY7dnE++Jv0UqPoDk0XNNQTVjs2VeCLSR4GhSRhcgnUFoQjx5mFwuYc2DWscQnDHTiW5ubaiVJR440zQrghKg8otO04LoUjxSw9IFEkTYXBxAIL8DCDllQ5C0eJjAILSmLggUgvGdimuGQSZ+GUlih+6xt8OubwI4GtjEiYyXFlFSDt35capIfB+ovpcnuJlG6E4pAsTmsw1ATkE0Xh5i+djenM6ElWQ5FVh62mwkmgGoQjxMveXegC/oSsvmc1PNYQixMtW/5X9ypOhUc2fAeBPZmJlrcQQChMvWfxMATg6GL0PoSjxC5F0Wp+wruz16E+HDfcGei9ZfNUVm1TQV2Wi3H/TTi0A+8RIjyTvFrKVf31cLQDe2C49zlue7vlq1zdaA9aHKP1p0ZqxqjQ79RRYdcit9qd7kWnvKypKokcZTYEHAyGleGUiJANfWk+wEG8FgHdyXgVO6+Yb7dPMees1QGTjIl2GbvZs0ZYA3RBBR/clmOrpqdYAIYTnsAd+/DGV+jjNVqOkH09ygLF21v8MZAawso9/kBThTteukGJOh+/sPJp3DqbznnkveUtnAFZDxNMCoGNSWk8jIH7jAOdZ3D1zGExj8PKPUy0iaNlODy4aEXoUsl5WV5fZ7twDRAPFUeOHJ4fo4SFEsEfxX+eSFxIMwIMxRTTY/JIjDfw0bQsBkMagott+B1A08bKN9+g94H/GbyduP6235QAAAABJRU5ErkJggg==);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        border: 1px solid #fff
    }

    .cart-main .cart-list .image-wrap {
        width: 1.2rem;
        margin-right: .3rem
    }

    .cart-main .cart-list .image-wrap .image {
        width: 100%;
        height: 1.2rem
    }

    .cart-main .cart-list .image-wrap .image img {
        width: 100%;
        height: 100%
    }

    .cart-main .cart-list .image-wrap .del {
        width: 100%;
        text-align: center;
        font-size: .24rem;
        color: #b5b5b5;
        margin-top: .2rem
    }

    .cart-main .cart-list .goods-wrap {
        width: 64%;
        font-size: .24rem
    }

    .cart-main .cart-list .goods-wrap .goods-title {
        width: 100%
    }

    .cart-main .cart-list .goods-wrap .goods-attr {
        width: 100%;
        margin-top: .1rem
    }

    .cart-main .cart-list .goods-wrap .goods-attr span {
        padding-right: .3rem
    }

    .cart-main .cart-list .goods-wrap .buy-wrap {
        width: 100%;
        height: .8rem;
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

    .cart-main .cart-list .goods-wrap .buy-wrap .price {
        font-size: .28rem;
        color: #cc0004;
        margin-top: .2rem
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap {
        width: 2.04rem;
        height: .5rem;
        border: 1px solid #000;
        margin-right: .2rem;
        border-radius: .08rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .btn {
        width: .6rem;
        height: .4rem;
        font-size: .32rem;
        text-align: center;
        line-height: .4rem
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .btn.active {
        color: #b5b5b5
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .dec {
        border-right: 1px solid #000
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .amount-input {
        width: .76rem;
        height: 100%
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .amount-input input {
        width: 100%;
        height: 75%;
        text-align: center
    }

    .cart-main .cart-list .goods-wrap .buy-wrap .amount-input-wrap .inc {
        border-left: 1px solid #000
    }

    .orderend-wrap {
        width: 100%;
        height: 1rem;
        background: #fff;
        position: fixed;
        z-index: 10;
        left: 0;
        bottom: 1.2rem;
        border-top: 1px solid #efefef;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex
    }

    .orderend-wrap .select-area {
        height: 100%;
        -webkit-box-flex: 3;
        -ms-flex: 3;
        flex: 3;
        -webkit-flex: 3;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between
    }

    .orderend-wrap .select-area .select-wrap, .orderend-wrap .select-area {
        width: auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center
    }

    .orderend-wrap .select-area .select-wrap .select-text {
        font-size: .24rem
    }

    .orderend-wrap .select-area .select-wrap .select-btn {
        width: .4rem;
        height: .4rem;
        border: 1px solid #efefef;
        border-radius: 100%;
        margin-left: .2rem;
        margin-right: .1rem
    }

    .orderend-wrap .select-area .select-wrap .select-btn.active {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFF0lEQVR4Xu2bTXbbNhDHZ+iQ2jSts8t7jVR7U0ur2ieIfAIrJ4hygsgnSHyC6AZxT2D5BFFOUGUluRsrUvtel7K9SYmK0wdKek8W8UUQpOjncCkCxPx/HGAGAwrhkV/4yPXDdwDb9IA/f/YP+fi//s0G27Ijdw8YPoc9L/BfAkGTAPYA4RAAd8WCaQYEAwQYA0I/Ctnnxj8wzhNOLgC4aAz8EwDsABed7RoDUJdCdpkHDKcAuEuTB28JsZ1Ns7g3Ep1HjJ25BOEEQPzG/eADILTyEJ54JkGPWHjqAkRmAFe14B0BdeTzOi8kNEPA7sEkPMsygjWA613Y/fepfwGIzSwGZO5L1K/csVf7M5jZPMsKAJ/r0Q58Kv6tyyTSzJvDsU04TQ2gfOJXUOwgpAJQXvH2EIwBlF+8HQQjAPGC92Pwh4OkxmadsukzrtyGRyYLoxGAUTW4KCzG28gV9SHo1afhK93jtABGNZ/H+A+6B5XxPhG9aUzZuco2JYCF6/vX5Ql3Osx0Q4Bdj+aDCLwWIpxUbtm+aiooAQyr/jkivtYNW477dOPNobmeC3D7uW2NKZPuTaQAFju64Loc4nRWJMXzHlfVnRbhzgWF4b5s3yAH8GDevlg8BzB64XfBw7dE9LvMC4QAHs7cl4sfVv02In5c+A7N6hP2TORHQgD3O+vcb1v3TcUvEUgighDAqBr0AOFkW9K04xJ98SJoizY/0pdHcFmfhol6hRhALSCtEdtqQPSlcseaotCm89z6JEzoTfwwfPGkiZ73aVv6lONmEB+vBFF03Pjrv/76GEkAteA9ArwrHYCM4mMAAGeNSfheDaCM4c+B+BiAIBwmPaDq9xHxpdoV4RKIxuRhCwF+ydVbHIlfAvjcmLJ7JbwEgFEtzv6ktfz1DcayLtgHxN9ygaAQf1X1P6Yvv9OgPmFHyikw0kSAzZU0NwjOxS9kb9ov8gBlCKzchs82QxCH8O2p33W2ccpJvBMA/HTmYMreiFzeye4xR/FOAPCH5AaB4LJyF7ZFSY7dnE++Jv0UqPoDk0XNNQTVjs2VeCLSR4GhSRhcgnUFoQjx5mFwuYc2DWscQnDHTiW5ubaiVJR440zQrghKg8otO04LoUjxSw9IFEkTYXBxAIL8DCDllQ5C0eJjAILSmLggUgvGdimuGQSZ+GUlih+6xt8OubwI4GtjEiYyXFlFSDt35capIfB+ovpcnuJlG6E4pAsTmsw1ATkE0Xh5i+djenM6ElWQ5FVh62mwkmgGoQjxMveXegC/oSsvmc1PNYQixMtW/5X9ypOhUc2fAeBPZmJlrcQQChMvWfxMATg6GL0PoSjxC5F0Wp+wruz16E+HDfcGei9ZfNUVm1TQV2Wi3H/TTi0A+8RIjyTvFrKVf31cLQDe2C49zlue7vlq1zdaA9aHKP1p0ZqxqjQ79RRYdcit9qd7kWnvKypKokcZTYEHAyGleGUiJANfWk+wEG8FgHdyXgVO6+Yb7dPMees1QGTjIl2GbvZs0ZYA3RBBR/clmOrpqdYAIYTnsAd+/DGV+jjNVqOkH09ygLF21v8MZAawso9/kBThTteukGJOh+/sPJp3DqbznnkveUtnAFZDxNMCoGNSWk8jIH7jAOdZ3D1zGExj8PKPUy0iaNlODy4aEXoUsl5WV5fZ7twDRAPFUeOHJ4fo4SFEsEfxX+eSFxIMwIMxRTTY/JIjDfw0bQsBkMagott+B1A08bKN9+g94H/GbyduP6235QAAAABJRU5ErkJggg==);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        border: 1px solid #fff
    }

    .orderend-wrap .orderend-btn {
        width: auto;
        height: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-flex: 1;
        background: #cc0004;
        font-size: .32rem;
        color: #fff;
        text-align: center;
        line-height: 1rem
    }

    .orderend-wrap .orderend-btn.disable {
        background: #bfbfbf
    }

    .orderend-wrap .total {
        font-size: .24rem;
        margin-right: .2rem
    }

    .orderend-wrap .total span {
        color: #cc0004
    }
</style>