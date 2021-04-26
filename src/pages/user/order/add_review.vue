<template>
    <div class="page">
        <SubHeader title="评价"></SubHeader>
        <div class="main">
            <ul class="service" v-for="(item,index) in reviewService" :key="index">
                <li>{{item.title}}</li>
                <li>
                    <div :class="{stars:true, active:item2.active}" v-for="(item2,index2) in item.scores" :key="index2"
                         @click="SET_REVIEW_SCORE({index:index,index2:index2,score:item2.value})"></div>

                </li>
            </ul>
            <div class="content-wrap">
                <textarea placeholder="来分享你的消费感受吧!" v-model="content"></textarea>
            </div>
            <button type="button" class="submit" @click="submit()">提交</button>
        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    import {Toast} from "vant"
    import SubHeader from "../../../components/subHeader/subHeader"
    import {mapActions, mapState, mapMutations} from "vuex"

    Vue.use(Toast)

    export default {
        name: "review",
        data() {
            return {
                content: ""
            }
        },
        components: {
            SubHeader
        },
        created() {
            this.gid = this.$route.query.gid ? this.$route.query.gid : "";
            this.ordernum = this.$route.query.ordernum ? this.$route.query.ordernum : "";
            this.$utils.safeUser(this);
            this.getReviewService();
            this.isSubmit = true;
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        computed: {
            ...mapState({
                reviewService: state => state.order.reviewService,
                uid: state => state.user.uid
            })
        },
        methods: {
            ...mapActions({
                getReviewService: "order/getReviewService",
                addReview: "order/addReview"
            }),
            ...mapMutations({
                "SET_REVIEW_SCORE": "order/SET_REVIEW_SCORE"
            }),
            submit() {
                if (this.content.match(/^\s*$/)) {
                    Toast("请输入评价内容");
                    return;
                }
                if(this.isSubmit) {
                    this.isSubmit = false;
                    let rsdata = [];
                    if (this.reviewService.length > 0) {
                        for (let i = 0; i < this.reviewService.length; i++) {
                            rsdata.push({
                                gid: this.gid,
                                myid: this.uid,
                                rsid: this.reviewService[i].rsid,
                                score: this.reviewService[i].score
                            })
                        }
                    }
                    //console.log(rsdata)
                    this.addReview({
                        gid: this.gid,
                        content: this.content,
                        ordernum: this.ordernum,
                        rsdata: JSON.stringify(rsdata),
                        success: (res) => {
                            if (res.code == 200) {
                                this.$router.go(-1);
                            } else {
                                Toast(res.data);
                            }
                        }
                    });
                }

            }
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
        padding-top: 1.02rem
    }

    .service {
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

    .service li:first-child {
        font-size: .32rem;
        margin-left: 3%;
        margin-right: 15%
    }

    .service li:nth-child(2) {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex
    }

    .service .stars {
        width: .4rem;
        height: .4rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAELElEQVR4Xt2bwVUbMRCGZ+Cx19BBoAJCBYEKAhUkqSD4gPQ4BU48iYNJBXEqgFSAqQCoAOiAXOHxJm/8ZB4sXu/MWtqVrQsH5NXMtyPpn5EWoaPW7/dXn56ezgDgEyLu7u/vD7swBbsYlMf03l+x82H8BwDYNsZct21PJwCcc4eI+LPk7NAYs73wAELo3wLA6gRnvxtjBm1CaD0CnHMDRPw6yUkiuiuKYrPX6/GUaKW1CsB7z3Oe535lI6Ija+1hK94DQNsALgBgq8a5h5WVlfW2oqA1ACcnJ1tExAAk7ZcxZk/ScdY+rQFwzt0i4prU4Ofn5/WDg4M7af+m/VoB4L3/BgC/NUYS0R9rLf8uaUsOgLe9x8fHK83bH3uMiNupFWJyABWiR/pWk4ujpABqRI8IQuooSApgmugReQ8ALI6stevS/tp+yQAcHx+vLS8vs+SN0ZJJ5GQAnHNniLgTw/uUUZAEgFL0iBilkshJAHjvJZJX5PirTkkkcnQAzrkdRORKT/SWIgqiAuCFb2lp6aKJ6BHSeohdPmsMgFNbItoINT1Oc+uyPKGP4m5DIuIS2jUi3jQtp4kAeO8/h/odO8oJTdvOSqlwYZUTqBEYY8xl3Q/fAAjKbQMROXVlR9nhceGy7lm5/n8EowrKCEBYuLhIOe/OSl/CEBGPONHClKu21Jqu+hHRLpbq813Z0tW41wyAuho9h3EZwDkAfMnBmA5s+ItBvPBe+qEDAzobkoj+8W432gVSJC+deSYcmBdAa+35iw5oUrgUjpVdNyLqWWtP2bA3QihGBSc7b0sGlavN76TwIi+KRHRjrX0j9t4BCGVsVkqc6CxMY+eLotgqH7lNTIZCTsD6+eMiEBiv+JMyxspsMKS7HAmLsD1uVqXLU9NhyXH2HETI1IpybT1gnrdHSQmtFkBIl/cQsT8Hb/vFROnhqghAgFB5tSVDMJfGGFHVSgyAnZwHjVC13VW9JBWA3DUCb3dFUaxprteoADDFXCFM2+unTVE1gDAVOJH4kdncF8/713Y3BcDlZy6VZ9OaHqA2AqC98NQWJWOM2h/1D8IUyLKO2ORmmRpA5IsPUYOjyXUaNYDMy2fqmyRqADnnBhLtXw45NYAZr71FDfnyw6T6f6ZtMPO6oVoLqCPAe5+dBhi/0SZaQA0gVw0whqDVAmoAuZ8larWACkBsDcAJDN/oiFmB1moBFYBYGiA4floUxSmnruG5/JnMzPnF+MhLut2oAMx6maLseNnI8HzONBuX47VaQAtg0vd+tbDrHC8/IIgtjgg1iNwA3BMRh/pAU6UZA2kIQqUFtBEgLYzeA8BhrI8glSCSAqibAlEdbzg1VF+cqSIg1AN52yoflyV1XAMi6TYYiiF8vMwLFP/lW5mDWKFeu5qWOvDUICI+tNngcjjbxbc+NM/5D/jKK3Awgw3rAAAAAElFTkSuQmCC);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-right: .3rem
    }

    .service .stars.active {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEXUlEQVR4Xt2bUVraQBDHZ0iw4aneoHgC8QTiCaonqD1B7WPjg/hAfCw9Qe0JtCcQTyCeQLyBPhEh+O+3ifgVgbATsskir0yyM7+d7P53MmEq6YcWbY43vAsCN1DBQfVH2C3DFS5jUDXmqF27YaZGPD7owaFoj49HvaL9KQXAqO21mPlkOlh0XT/ce/cA4tSv1u6IaXMmWOCrexyeFwmh8AyIAu+ciL/MDxJ9ZxjucIseioJQKAC0q40xuzdpwQE4rR6HrXcJIAq8KyJupganFsTRYKuoLCgsA0ZnXpPBVzozC9Cv6vHgSMd2VZvCAESBd0fEdV2HHcYW/wj7uvZZ7QoBELW9Q2L+LXMSf1w/PJRdI7c2DuBF8d1IZn8SBhh7phWicQDzRY/uTJkXR0YBpIoeTQams8AogHTRo0mA0Hf9cEvXWmpnDADOvPoYfCd1aK69QYlsDEAU1C6IaD8XAAazwAgAiejRBWRKIhsBoCV5dSN/3RPNSOTcAUTBxj6Ro9I/95+JLMgVQLLwkTrwaEteESXQQ97ls8wAkqOtsw3iBhMaS095okh1jNEFcY8JPQfj26zlNC0ACLzdZ6ChgiWmevHB6gBRNugSqK+gVJh77IfXy66cAqCUG214289MTTxTPZ7dSeFy2Z0s/R+gOEsWQYkBqIULcE7WPVj9OUAXTKfqoMUmV219h8qyHB/wVH2+LD9KGjd+PKKghpLGt2JYjtq1S2L6bIU3RTsB+ssvpzb1Supj0eOXPN6jg6gZ7wImDi8lB6cx/PjA9YeXrzogW+FSYxwLTZievzv+U0e5NiWE8qngWBjxlEvT1eYZKfyeF0UQ3Vb9QfJK/uU3A0DJ4Wij1mWibdvnUuKfCt4dDppvX7nNPQwl1VyvR8yfJINYbJus+HMaMBaeBl/e5Kq2lbXfHh1EO4uOy6nHYZ3X2RbPeuLakory0nrAOm+POiW0pQAUxHHw4QhU+Wn9bKdsd4t81wKgLl4njQDCddUP0xsxFm2DabO8Dhph0Xa3cgbE64n9GuHRGQ7qkvYa7UdgQtBiCAv3+rSsFgNQNxu1ax1m+mbToih57lOlsE5Qo8DrMvGujm1xNtleo2fKAGnDU1EQXH8gjkd8QbIl2llHzNJZJgaQa+NDzqmRpZ1GDMDq8lmGThIxAJvPBjra/23SiQGs1vaWc87P3E7eXCkGYPOZIIsWEAOwUwO86lRxS50YgK0aYIJAqgUyALBTA0wASLWACIABDfAIUh0d+VWgpVpABCBHDfAIoOOOwo46uqr7EqiVz/kieeWlu9+IAOTQTDEV+Fsn4/uj0lmlHC/VAiIAK2iA1MBnQKgPLIhaWUDYBQC4Z0anMnw6l1RpJkBi1SkEIdUCogzQFkHAvXI8r48gJSCMAlj6COQceJZHQ/rFmSgDku9/aupLrunXZYYDl4Awug3GlWHVIktuiwgNMPUZdJ5XqutuXf+vEWA+UjpClcOZxi3JFqju8w8fCjwM6rQDlwAAAABJRU5ErkJggg==);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%
    }

    .content-wrap {
        width: 100%;
        height: 4rem;
        text-align: center;
        overflow: hidden
    }

    .content-wrap textarea {
        width: 95%;
        height: 90%;
        font-size: .32rem;
        margin-top: .3rem;
        outline: none;
        border: 0 none;
        resize: none
    }

    .submit {
        width: 90%;
        height: .8rem;
        background-color: #e51b19;
        font-size: .28rem;
        color: #fff;
        text-align: center;
        line-height: .8rem;
        border: 0 none;
        border-radius: 4px;
        outline: none;
        margin: 0 auto;
        display: block;
        margin-top: .3rem
    }
</style>