<template>
    <div>
        <router-view></router-view>
        <div class="bottom-nav">
            <ul>
                <li :class="{home:true, active:homeStyle}" @click="goPage('/index')">
                    <div class="icon home-icon"></div>
                    <div>首页</div>
                </li>
                <li :class="{cart:true, active:cartStyle}" @click="goPage('/cart')">
                    <div class="icon cart-icon"></div>
                    <div>购物车</div>
                    <div class="spot" v-show="$store.state.cart.cartData.length>0"></div>
                </li>
                <li :class="{mine:true, active:mineStyle}" @click="goPage('/mine')">
                    <div class="icon mine-icon"></div>
                    <div>我的</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                homeStyle: true,
                cartStyle: false,
                mineStyle: false
            }
        },
        methods: {
            goPage(url) {
                this.$router.replace(url);
            },
            changeStyle(name) {
                switch (name) {
                    case "index":
                        this.homeStyle = true;
                        this.cartStyle = false;
                        this.mineStyle = false;
                        break;
                    case "cart":
                        this.homeStyle = false;
                        this.cartStyle = true;
                        this.mineStyle = false;
                        break;
                    case "mine":
                        this.homeStyle = false;
                        this.cartStyle = false;
                        this.mineStyle = true;
                        break;
                    default:
                        break;
                }
            }
        },
        created() {
            //console.log(this.$route)
            document.title = this.$route.meta.title;
            this.changeStyle(this.$route.name);
        },
        beforeRouteUpdate(to, from, next) {
            //console.log(this.$route)
            document.title = to.meta.title;
            this.changeStyle(to.name);
            next();
        },
        activated() {//解决缓存问题(与created钩子函数里面的方法一致)
            document.title = this.$route.meta.title;
            this.changeStyle(this.$route.name);
        }
    }
</script>

<style scoped>
    .bottom-nav {
        width: 100%;
        height: 1.2rem;
        background-color: #fff;
        webkit-box-shadow: 0 0 10px #efefef;
        -moz-box-shadow: 0 0 10px #efefef;
        box-shadow: 0 0 10px #efefef;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
    }

    .bottom-nav ul {
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0 .5rem;
    }

    .bottom-nav ul li {
        width: 1rem;
        position: relative;
    }

    .bottom-nav ul li .icon {
        width: .6rem;
        height: .6rem;
        background-image: url("../../../assets/images/home/main/home.png");
        background-repeat: no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        margin: 0 auto;
    }

    .bottom-nav ul li > div:last-child {
        font-size: .28rem;
        text-align: center;
    }

    .bottom-nav ul li.active > div:last-child {
        color: #eb1625;
    }

    .bottom-nav ul li .home-icon {
        background-image: url("../../../assets/images/home/main/home.png");
    }

    .bottom-nav ul li.active .home-icon {
        background-image: url("../../../assets/images/home/main/home_active.png");
    }

    .bottom-nav ul li .cart-icon {
        background-image: url("../../../assets/images/home/main/cart.png");
    }

    .bottom-nav ul li.active .cart-icon {
        background-image: url("../../../assets/images/home/main/cart_active.png");
    }

    .bottom-nav ul li .mine-icon {
        background-image: url("../../../assets/images/home/main/mine.png");
    }

    .bottom-nav ul li.active .mine-icon {
        background-image: url("../../../assets/images/home/main/mine_active.png");
    }
    .bottom-nav ul .spot {
        width: .2rem;
        height: .2rem;
        background-color: #cc0004;
        border-radius: 100%;
        position: absolute;
        z-index: 1;
        right: 0;
        top: 0;
    }
</style>