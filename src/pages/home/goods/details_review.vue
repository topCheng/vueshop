<template>
    <div class="page">
        <div class="reviews-main">
            <div class="reviews-title">商品评价（{{total}}）</div>
            <div class="reviews-wrap" v-show="goodsReview.length>0">
                <div class="reviews-list" v-for="(item, index) in goodsReview" :key="index">
                    <div class="uinfo">
                        <div class="head"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.head"
                                               alt="">
                        </div>
                        <div class="nickname">{{item.nickname}}</div>
                    </div>
                    <div class="reviews-content" v-html="item.content"></div>
                    <div class="reviews-date">{{item.times}}</div>
                </div>
            </div>
            <div class="no-data" v-show="goodsReview.length<=0">暂无评价！</div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex"
    import UpRefresh from "../../../assets/js/libs/uprefresh"

    export default {
        name: "details_review",
        data() {
            return {
                gid: this.$route.query.gid ? this.$route.query.gid : ""
            }
        },
        computed: {
            ...mapState({
                goodsReview: state => state.goodsReview.goodsReview,
                total: state => state.goodsReview.total
            })
        },
        created() {
            this.pullUp = new UpRefresh();
            this.getReview({
                gid: this.gid, success: (pageNum) => {
                    this.$nextTick(() => {
                        this.$utils.lazyImg();
                    });
                    this.pullUp.init({
                        "curPage": 1,
                        "maxPage": parseInt(pageNum),
                        "offsetBottom": 100
                    }, (page) => {
                        //console.log(page);
                        this.getReviewsPage({gid: this.gid, page: page});
                    });
                }
            });
        },
        methods: {
            ...mapActions({
                getReview: "goodsReview/getReview",
                getReviewsPage: "goodsReview/getReviewsPage"
            })
        },
        beforeDestroy() {
            this.pullUp.uneventSrcoll();
        }
    }
</script>

<style scoped>
    .page {
        margin-top: 1.2rem
    }

    .reviews-main {
        width: 100%;
        background-color: #fff;
        margin-top: .5rem;
        overflow: hidden;
        padding-bottom: .5rem
    }

    .reviews-main .reviews-title {
        color: #7b7f82;
        font-size: .32rem;
        width: 90%;
        margin: 0 auto;
        margin-top: .2rem
    }

    .reviews-main .reviews-wrap {
        width: 90%;
        margin: 0 auto
    }

    .reviews-main .reviews-wrap .reviews-list {
        width: 100%;
        margin-top: .4rem
    }

    .reviews-main .reviews-list .uinfo {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        height: .6rem;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center
    }

    .reviews-main .reviews-list .uinfo .head {
        width: .6rem;
        height: .6rem;
        margin-right: .2rem
    }

    .reviews-main .reviews-list .uinfo .head img {
        width: 100%;
        height: 100%;
        border-radius: 100%
    }

    .reviews-main .reviews-list .uinfo .nickname {
        width: auto;
        font-size: .28rem
    }

    .reviews-main .reviews-list .reviews-content {
        width: 100%;
        margin: 0 auto;
        font-size: .28rem;
        margin-top: .2rem
    }

    .reviews-main .reviews-list .reviews-date {
        width: auto;
        font-size: .28rem;
        color: #7b7f82;
        margin-top: .2rem
    }

    .reviews-main .reviews-more {
        width: 2.44rem;
        height: .56rem;
        border: 1px solid #d50a17;
        line-height: .56rem;
        text-align: center;
        font-size: .28rem;
        margin: 0 auto;
        margin-top: .5rem;
        border-radius: .1rem
    }
</style>