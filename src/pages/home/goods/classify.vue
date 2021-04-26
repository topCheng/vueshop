<template>
    <div class="page">
        <div class="search-header" @click="isShowSearch.show=true">
            <div class="back" @click="goBack()"></div>
            <div class="search">请输入宝贝名称</div>
        </div>
        <div class="goods-main">
            <div class="classify-wrap" ref="classify-wrap">
                <div>
                    <div ref="classify-item" :class="{'classify-item':true, 'active':item.active}"
                         v-for="(item, index) in classifyGoods" :key="index" @click="replacePage('/goods/classify/item?cid='+item.cid+'', index)">{{item.title}}
                    </div>
                </div>
            </div>
            <div class="goods-content">
                <router-view></router-view>
            </div>
        </div>
        <my-search :showSearch="isShowSearch"></my-search>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations} from "vuex"
    import IScroll from "../../../assets/js/libs/iscroll"
    import MySearch from "../../../components/search/search"

    export default {
        name: "classify",
        data() {
          return {
              isShowSearch: {show: false}
          }
        },
        components: {
            MySearch
        },
        methods: {
            ...mapActions({
                getClassify: "goods/getClassify"
            }),
            ...mapMutations({
                SELECT_ITEM: "goods/SELECT_ITEM"
            }),
            goBack() {
                this.$router.go(-1);
            },
            preventScroll(e) {
                e.preventDefault();
            },
            selectItem(index) {
                //console.log(index);
                this.SELECT_ITEM({index: index});
                let offsetTop = this.$refs["classify-item"][0].offsetHeight * index;
                let halfHeight = parseInt(this.$refs["classify-wrap"].offsetHeight / 3);
                let bottomHeight = parseInt(this.$refs["classify-wrap"].scrollHeight - offsetTop)
                if (offsetTop > halfHeight && bottomHeight > this.$refs["classify-wrap"].offsetHeight) {
                    this.myScroll.scrollTo(0, -offsetTop, 1000);
                }
            },
            replacePage(url, index) {
                this.$router.replace(url);
                this.selectItem(index);
            }
        },
        computed: {
            ...mapState({
                classifyGoods: (state) => {
                    //console.log(state)
                    return state.goods.classifyGoods;
                }
            }),
        },
        created() {
            this.cid = this.$route.query.cid ? this.$route.query.cid : ""
            this.getClassify({
                success: () => {
                    this.$nextTick(() => {
                        this.myScroll.refresh();
                        //console.log(this.classifyGoods);
                        if(this.classifyGoods.length > 0 && this.cid) {
                            let i = 0;
                            for(;i < this.classifyGoods.length; i++) {
                                if(this.classifyGoods[i].cid === this.cid) {
                                    break;
                                }
                            }
                            this.selectItem(i);
                        } else {
                            this.selectItem(0);
                        }
                    });
                }
            });
        },
        mounted() {
            document.title = this.$route.meta.title;
            this.$refs["classify-wrap"].addEventListener("touchmove", this.preventScroll);
            this.myScroll = new IScroll(this.$refs["classify-wrap"], {
                scrollX: false,
                scrollY: true,
                preventDefault: false
            });
        },
        beforeDestroy() {
            //console.log(this.$refs["classify-wrap"])
            this.$refs["classify-wrap"].removeEventListener("touchmove", this.preventScroll);
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .search-header {
        width: 100%;
        height: 1rem;
        background: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        border-bottom: 1px solid #efefef;
    }

    .search-header .back {
        width: .8rem;
        height: .8rem;
        background-image: url(data:image/png;base64,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);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .search-header .search {
        width: 80%;
        height: .69rem;
        border: 1px solid #b2b2b2;
        border-radius: .1rem;
        font-size: .28rem;
        color: #626262;
        line-height: .69rem;
        padding-left: .2rem;
    }

    .goods-main {
        width: 100%;
        height: 92.5vh;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
    }

    .goods-main .classify-wrap {
        width: 1.72rem;
        height: 100%;
        overflow: hidden;
        margin-right: 3%;
        position: relative;
        z-index: 1;
    }

    .goods-main .classify-wrap .classify-item {
        width: 100%;
        height: .8rem;
        border-bottom: 1px solid #efefef;
        background-color: #fff;
        font-size: .28rem;
        text-align: center;
        line-height: .8rem;
        overflow: hidden;
    }

    .goods-main .classify-wrap .classify-item.active {
        color: red;
    }

    .goods-main .goods-content {
        width: 71%;
        height: 100%;
    }

</style>