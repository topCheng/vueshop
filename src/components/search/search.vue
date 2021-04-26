<template>
    <div class="search-component" v-show="showSearch.show">
        <div class="search-header">
            <div class="close" @click="showSearch.show=false"></div>
            <div class="search-wrap">
                <div class="search-input-wrap"><input type="text" v-model="keyword" placeholder="请输入宝贝名称"
                                                      class="search"></div>
                <button type="button" class="search-btn" @click="goSearch()"></button>
            </div>
        </div>
        <div class="search-main" v-if="historyKeywords.length > 0">
            <div class="search-title-wrap">
                <div class="search-title">最近搜索</div>
                <div class="bin" @click="clearHistoryKeywords()"></div>
            </div>
            <div class="search-keywords-wrap">
                <div class="keywords" v-for="(item, index) in historyKeywords" :key="index" @click="goSearch(item)">{{item}}</div>
            </div>
        </div>
        <div class="search-main">
            <div class="search-title-wrap">
                <div class="search-title">热门搜索</div>
            </div>
            <div class="search-keywords-wrap">
                <div class="keywords" v-for="(item,index) in hotwords" :key="index" @click="goSearch(item.title)">
                    {{item.title}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapState, mapActions} from "vuex"
    import {Dialog} from "vant"

    export default {
        name: "search",
        data() {
            return {
                keyword: ""
            }
        },
        props: {
            showSearch: {
                type: Object,
                default: {}
            },
            isLocal: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState({
                "historyKeywords": (state) => state.search.historyKeywords,
                "hotwords": (state) => state.search.hotwords
            })
        },
        methods: {
            ...mapMutations({
                "SET_KEYWORDS": "search/SET_KEYWORDS",
                "CLEAR_KEYWORDS": "search/CLEAR_KEYWORDS"
            }),
            ...mapActions({
                "getHotwords": "search/getHotwords"
            }),
            goSearch(keyword) {
                //console.log(keyword);
                let tempKeyword = keyword || this.keyword || "";
                if (tempKeyword) {
                    if (this.keywords.length > 0) {
                        for (let i = 0; i < this.keywords.length; i++) {
                            if (this.keywords[i] === tempKeyword) {
                                this.keywords.splice(i--, 1);
                            }
                        }
                    }
                    this.keywords.unshift(tempKeyword);
                    //console.log(this.keywords);
                    this.showSearch.show  = false;
                    this.SET_KEYWORDS({historyKeywords: this.keywords});
                }
                if(this.isLocal) {
                    this.$router.replace("/goods/search?keyword="+tempKeyword);
                } else {
                    this.$router.push("/goods/search?keyword="+tempKeyword);
                }
            },
            clearHistoryKeywords() {
                if (this.historyKeywords.length > 0) {
                    Dialog.confirm({
                        title: '',
                        message: '确认删除吗?',
                    }).then(() => {
                        // on confirm
                        this.CLEAR_KEYWORDS();
                    }).catch(() => {
                        // on cancel
                    });
                }
            }
        },
        created() {
            this.keywords = this.historyKeywords ? this.historyKeywords : [];
            this.getHotwords();
        }
    }
</script>

<style scoped>
    .search-component {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 99;
        left: 0;
        top: 0;
        background-color: #fff
    }

    .search-component .search-header {
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #efefef;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center
    }

    .search-component .search-header .close {
        width: .5rem;
        height: .5rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABeklEQVRYR+2Xz03DMBSHf06knLMJjNARYAPYwCCVK5yJSLwBsAFM0LJBR+gI7ZWKGiWibeLa8bOfq17I1ZK/z/b7F4Ezf+LMfOwFpJQl8uIVwLt6ef5IKSan00ts0SDDnaqqRX/vg8D9w5MQeGwXtda3qq7eUkh08B/MhBAltP5q6mpiF5CyFFkxh8BFKokBHFjrTE+cN9BC22dIJUGBt8yjIEwhQYVbBbg3EQJ3CsRKhMJHBUIlYuBeAapELJwk4JPgwMkCLgnkWOyLjCPPfcUsqBdYUnTVVbhIeNAN7E5iSnDgcQL92v5nxekdYU8whK+hseT2DrKALdqx2Sy5vYMkMJZq3N7hFaDkOUdiVIACd2UHNTCdAiFwjoRVIAYeK3E8kBipZhujfOU1JCYGApyTm1JUicNUnODkXgng2hz5+2O5FAINt7aPSmj92dTVlXMsR1bcINdzc3T2vblvvfvpyQqJ7bdSSq2sAr5NTrXurYSnAu/2/Rf4BdT6jDDponuuAAAAAElFTkSuQmCC);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-left: .2rem;
        margin-right: .2rem
    }

    .search-component .search-header .search-wrap {
        width: 78%;
        height: .64rem;
        border: 1px solid #b2b2b2;
        border-radius: .1rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center
    }

    .search-component .search-header .search-wrap .search-input-wrap {
        width: 85%;
        height: 100%;
        border-right: 1px solid #b2b2b2
    }

    .search-component .search-header .search-wrap .search {
        width: 80%;
        height: 100%;
        margin-left: .2rem;
        font-size: .28rem
    }

    .search-component .search-header .search-wrap .search-btn {
        width: .5rem;
        height: .5rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACxElEQVRYR8VW/1FbMQyWvEDTCZpO0DBBwwTE9gCFCQoTNEwATNB0ANthgsIGrxM0bJAuYPWUs985jt+zkzvAd++PxJb06dcnIbzzwXe2D80AnHML7/0FIs4AgL94NkTUCSGeAOBRSrk5xqkqAGPMJSL+AIBpi2IiWgkhbluBDAJwzk2I6HfmbQsGfrMlohut9aomUATgnJsF45OogIj+IeKKPyllF/93zk2993NEvASAr6lBIrrXWt+MgTgAEDz/CwCp8VshxL2UcjumzDk3Z6MA8CUBfjUWiQMA1lr2bqeAvRZCLKSUXGBNJzjAob+IAoh4PqRjD0AouJ8tgjU0qSMA0CmlzkoyOYANIn4K3t9qrZc1Q0P3HAnvPev7EPQVU9ED4D4nIpeEflrLeQ2cMWYZWpifPiqlFrlMD8Bay3n7Fh48KKWuawZq99whRMQFvTuI+DF3KgXQFx8inqWtVjM0dp/WQqkYUwAUFSmlqgzZCspau44dQUQHdfDqANI6IKKDwn51ANZaJqbvobiZnvl3f3oAxpi+BRHxc+swqaXCWssktqPoWg2M5qpmaOjeGLONXFByLI3ANSLeBUVPSqnzU41GuYxbXrTWByM9JaK8Zwf5uxVYRsdFbtlrt4yMupCz0Qk4Evo+omGoFZl1D0CY7Ww48vdaay1bPY7v8qFWar+eHXPluTBPsmMiYYxJa4nVPyul5kNOFBkv7d0gyJXM/ftrqD1DwfHumC6sfxBxPjbUBim3EInoREdEGyFE572fJFtyv0GFh8+IyNOP17u7IHM1OIxKISqtWLV64IIDAN4Fd7tEvpjk6WwaOiEa7E2/ZuVAiOgFEdeIuEy9TIdRkNmrqSYACbFwmGfeeyYU/racCgDYjNQGr/dMx/2imq5oRwGohX/oPiyqeyDiyH8TAAwsBZHywpsBOIoHTg31KXL/AfpAmjBaHFWsAAAAAElFTkSuQmCC);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        background-color: #fff;
        border: 0 none;
        outline: none;
        margin-left: .15rem
    }

    .search-component .search-main {
        width: 100%;
        margin-top: .2rem
    }

    .search-component .search-main .search-title-wrap {
        width: auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding-left: .4rem;
        padding-right: .4rem
    }

    .search-component .search-main .search-title-wrap .search-title {
        width: auto;
        font-size: .28rem
    }

    .search-component .search-main .search-title-wrap .bin {
        width: .4rem;
        height: .4rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACZ0lEQVRYR8VXwXEbMQwE+PIvcgdyBbF//tnpQAQbUCqIOohKUAlKASSVCnypIMovv6iDqAIiA4WnOZ+O5PHkGfNpE4fFAruEEN754Dvnh0kAvPcLAPjYAX9k5j0i/tJaH2uKqgbgvZ8x8x8A+A4A8zYZM88RsSGi5WQA3vtnZuZcJc65rSQmouduIu/9PTP/RMTbGhbODMgHQggNIn4YqOAAAAdmvkHER2Z+UUr96LcAADaxFVsi6v4/SUqyBd57ofdMMQDMQgiP8W+/5YuI+IoFAHjK0L8HgNN8IOJnrbUUNW0Ix/ZYWBXg7f0QghQ0U0pt2zZdMCBDBgBfxiapvPetrbyNGwIwj1M+qocVAJ4Q8ZPWuunGDM6Ac06UcHG5ItnF1fjNuyIDEumca5h5Z4zZXJO0jY3yfiGii4JTDIjWj0S0egsA1toVIi763pFUgbV2LRIbCpgCyDknTM6GXHKQgUiZJ6LbKQn7MbmWpgCI3/+ttdUUWGvtUSm16Csga0S5oBpWxFFF1qliklYcaWuMMeuahP270s4Qgijq7IhFH4hSTA5ODaDSQCcZsNYuEXF5rRLi852UdO41lN1g0DxqGIit3BpjxFsuTnYjivb5oLWWp3TSKdl6FoC19qCUWmmtd1Oyt1vSkAUnX8NuomuVIMtrCGFjjOkuNq9qKTEglnxPRLIFV5+ogGx8FoBUwMxfieihOvv/V3UnO2LOS0oATpturoc5YM45+a2wzs1Q8XdBaYoLAGSxyapoDIC9sKCUOm2xY48soNHIsjmKAOIky3Y75RxSBjRKhlMy1sYUGaj9YO39fyizTzADclsVAAAAAElFTkSuQmCC);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%
    }

    .search-component .search-main .search-keywords-wrap {
        width: auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-justify-content: flex-start;
        padding-left: .4rem;
        padding-right: .4rem;
        margin-top: .3rem;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap
    }

    .search-component .search-main .search-keywords-wrap .keywords {
        width: 26%;
        height: .6rem;
        color: #717376;
        border: 1px solid #efefef;
        border-radius: .64rem;
        font-size: .28rem;
        text-align: center;
        overflow: hidden;
        line-height: .6rem;
        margin-right: 1.3%;
        margin-left: 1.3%;
        margin-bottom: .2rem;
        padding-left: .1rem;
        padding-right: .1rem
    }

</style>