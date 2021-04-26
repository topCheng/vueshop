<template>
    <div class="page">
        <SubHeader title="我的收藏"></SubHeader>
        <div class="main">
            <div class="goods-list" v-for="(item,index) in collection" :key="index">
                <div class="image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" alt="">
                </div>
                <div class="title">{{item.title}}</div>
                <div class="price">¥{{item.price}}</div>
                <div class="btn-wrap">
                    <div class="btn" @click="$router.push('/goods/details?gid='+item.gid)">购买</div>
                    <div class="btn" @click="delCollection(index,item.fid)">删除</div>
                </div>
            </div>
        </div>
        <div class="no-data" v-show="collection.length<=0">您还没有收藏商品！</div>
    </div>
</template>

<script>
    import SubHeader from "../../../components/subHeader/subHeader"
    import {mapActions, mapState, mapMutations} from "vuex"
    import UpRefresh from "../../../assets/js/libs/uprefresh"
    import Vue from "vue"
    import {Dialog} from "vant"

    Vue.use(Dialog)

    export default {
        name: "my_collection",
        components: {
            SubHeader
        },
        created() {
            this.$utils.safeUser(this);
            this.pullUp = new UpRefresh();
            this.myCollection({
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
                        this.myCollectionPage({
                            page: page, success: () => {
                                this.$utils.lazyImg();
                            }
                        });
                    })
                }
            })
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        computed: {
            ...mapState({
                collection: state => state.user.collection
            }),
        },
        methods: {
            ...mapActions({
                myCollection: "user/myCollection",
                myCollectionPage: "user/myCollectionPage",
                asyncdelCollection: "user/delCollection"
            }),
            delCollection(index, fid) {
                Dialog.confirm({
                    message: "确定要删除吗?",
                }).then(() => {
                    this.asyncdelCollection({
                        index: index, fid: fid, success: () => {
                            this.$nextTick(() => {
                                this.$utils.lazyImg();
                            });
                        }
                    });
                }).catch(() => {
                    // on cancel
                });
            }
        },
        beforeDestroy() {
            this.pullUp.uneventSrcoll();
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
        padding-top: 1.2rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 2%;
        padding-right: 2%;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap
    }

    .main .goods-list {
        width: 48%;
        height: 5.8rem;
        margin-bottom: .3rem;
        overflow: hidden
    }

    .main .goods-list .image {
        width: 3.36rem;
        height: 3.35rem;
        margin: 0 auto
    }

    .main .goods-list .image img {
        width: 100%;
        height: 100%;
        border: 0 none
    }

    .main .goods-list .title {
        width: 100%;
        height: .8rem;
        overflow: hidden;
        font-size: .28rem;
        margin-top: .2rem
    }

    .main .goods-list .price {
        font-size: .28rem;
        color: #f93036;
        margin-top: .2rem
    }

    .main .goods-list .btn-wrap {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        margin-top: .2rem
    }

    .main .goods-list .btn-wrap .btn {
        width: 1.04rem;
        height: .52rem;
        border: 1px solid #f93036;
        font-size: .28rem;
        color: #f93036;
        border-radius: 4px;
        text-align: center;
        line-height: .52rem
    }
</style>