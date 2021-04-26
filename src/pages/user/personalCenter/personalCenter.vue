<template>
    <div>
        <SubHeader title="个人中心" :isBack="false"></SubHeader>
        <div class="user-info-wrap">
            <div class="head">
                <img :src="head ? head : require('../../../assets/images/user/my/default-head.png')" alt="">
            </div>
            <div class="nickname">{{nickname ? nickname : "昵称"}}</div>
            <div class="points">我的积分：{{points}}</div>
        </div>
        <div class="order-name-wrap">
            <div class="order-name">全部订单</div>
            <div class="show-order" @click="$router.push('/user/order')">查看全部订单 &gt;</div>
        </div>
        <div class="order-status-wrap">
            <div class="item" @click="$router.push('/user/order?status=0')">
                <div class="icon wait"></div>
                <div class="text">待支付</div>
            </div>
            <div class="item" @click="$router.push('/user/order?status=1')">
                <div class="icon take"></div>
                <div class="text">待收货</div>
            </div>
            <div class="item" @click="$router.push('/user/order/review?status=2')">
                <div class="icon comment"></div>
                <div class="text">待评价</div>
            </div>
        </div>
        <div class="menu-list-wrap">
            <ul @click="$router.push('/user/profile')">
                <li>个人资料</li>
                <li></li>
            </ul>
            <ul @click="$router.push('/user/address')">
                <li>收货地址</li>
                <li></li>
            </ul>
            <ul @click="$router.push('/user/bind_cellphone')">
                <li>绑定手机</li>
                <li></li>
            </ul>
            <ul @click="$router.push('/user/modify_password')">
                <li>修改密码</li>
                <li></li>
            </ul>
            <ul @click="$router.push('/user/my_collection')">
                <li>我的收藏</li>
                <li></li>
            </ul>
            <div class="btn" @click="isLogin ? logout() : $router.push('/login')">{{isLogin?"安全退出":"登录/注册"}}</div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    import {mapState, mapActions} from "vuex"
    import SubHeader from "../../../components/subHeader/subHeader"
    import {Dialog} from "vant"

    Vue.use(Dialog)

    export default {
        name: "personalCenter",
        data() {
            return {}
        },
        components: {
            SubHeader
        },
        computed: {
            ...mapState({
                isLogin: state => state.user.isLogin,
                head: state => state.user.head,
                points: state => state.user.points,
                nickname: state => state.user.nickname
            }),
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            ...mapActions({
                asyncUserLogout: "user/userLogout",
                getUserInfo: "user/getUserInfo"
            }),
            logout() {
                Dialog.confirm({
                    message: "确定要退出吗?",
                }).then(() => {
                    this.asyncUserLogout();
                }).catch(() => {
                    // on cancel
                });
            }
        },
        beforeRouteEnter(to, from, next) {
            if (Boolean(localStorage["isLogin"])) {
                next();
            } else {
                next("/login");
            }
        }
    }
</script>

<style scoped>
    .user-info-wrap {
        width: 100%;
        height: 2.8rem;
        background-image: url(../../../assets/images/user/my/mybg.png);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: top;
        margin-top: 1.02rem;
        position: relative;
        z-index: 1
    }

    .user-info-wrap .head {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        z-index: 1;
        left: 5%;
        bottom: 15%
    }

    .user-info-wrap .head img {
        width: 100%;
        height: 100%;
        border-radius: 100%
    }

    .user-info-wrap .nickname {
        bottom: 35%
    }

    .user-info-wrap .nickname, .user-info-wrap .points {
        width: auto;
        height: auto;
        white-space: nowrap;
        position: absolute;
        z-index: 1;
        left: 27%;
        font-size: .24rem;
        color: #fff
    }

    .user-info-wrap .points {
        bottom: 20%
    }

    .order-name-wrap {
        width: 100%;
        height: .8rem;
        background-color: #fff;
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
        -webkit-align-items: center;
        overflow: hidden;
        margin-bottom: 1px
    }

    .order-name-wrap .order-name {
        font-size: .28rem;
        margin-left: 3%
    }

    .order-name-wrap .show-order {
        font-size: .24rem;
        margin-right: 3%
    }

    .order-status-wrap {
        width: 100%;
        height: 1.4rem;
        background-color: #fff;
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
        -webkit-align-items: center;
        padding-left: 10%;
        padding-right: 10%
    }

    .order-status-wrap .item {
        width: 1rem;
        height: auto
    }

    .order-status-wrap .item .icon {
        width: .5rem;
        height: .5rem;
        margin: 0 auto
    }

    .order-status-wrap .item .icon.wait {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACU0lEQVRYR+1XS3LaQBB9TUZskSsMa6iItckJHN8gNwjcQJzA+ARxTmB8gpATxDmByRqlwpqhyqw9Kto1U5JKYAnJFio2npUQmn5v+vO6h3DiRSfGR0JAtb0vALhOQnId/Nm3T+uPn75yg25B5NYJHtsmxqitFtPk90r25wTugjEBMK+RxACECYhacrVIPE+q02fi7Y+2+ufXCG5Nq443AegKW76U6+DevLMEAL6Wq8B4oNb1TqC0B0xJijCcn22Wm3RMHt2uGwpxLsLw7/5/ZWK3lv0hg4cM8jtqYRM+MwdUx5uB0ZIquEwbjt67UgVGM46yMgnYkzpiSSA/rlkrVA36LZ5072yzXB4F/VAVqLbng3AldNgzYLrpPBD4Lq9arKB9oPMyxJhp42j9yxzkYBkq6d0zaEnE5sRDuQq6WQDmOxBdlAFPvmHe0JZHBwmsZH9AhAe7KSUeO3kRheY1YhaFeMag1gsCj263GzriNgUyiJ4TmRY6HMV5EOdGHsH9KtKO893Rehw2hW9UMYuAScBZAYFhBQI3jtZ+LoH9ONr4AsgrvcQDzDdSBeMyeRCF4CcIvewQNJ3/hwwx43MsJLbJvCUJLQBfZ4fAxidZw+gp6eHiKZzua0FUhnG+FDqCmWbmEIXdsCgEhUgFHxQSMCdDo+Gmp5iqoOn9hQSOCRY1o28MGh9sRscE3RGt94kozwOv0fEq4cmZiOzwccGgCTHXNpYz0YDAZix3d8Zy0/EATIlQqpdX8YDZ++JiEhu0rZe51ttRfBfY0YGqJ6q6/+S342c+MbeJ11RH+AAAAABJRU5ErkJggg==);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%
    }

    .order-status-wrap .item .icon.take {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB8klEQVRYR+2WS1LCQBCGuyG4FcpM1lAka+EE4gnkCHgC4QZ4AzyB3kA8gXiDuE4os87EMm4lpK0JhArJYCrFywWzS6qn+5t/erob4cgLjxwfTgD/RwHvotmlMl5ukxM4p3f1czou4mOlANcMKrJxky1zrUKqngD2okCUTyW8i6+JAB0AeNC4Zaavbi8AnOkTQLxKBiMAR3OtxtEARGAkuFW59ZSEOJgCIqhMhYMCyFQ4OEBahYMDpFU4CgARmBq32hFMnJG7LMWyZ5h+fnHJ3g+Apo8B8Oav3pIB8FhzRICtbRoSApkqn/ZdZrQQaQgE1ZW/VGHKACQDc1XvKEFg1nzHX12RqncWTzl/Mc9+S+4TvsR3UFHGcYWUAkTkQK+AGJHHlctjRo8QHvNDR+Xmhbl2VxwCEJ4jX0Q+Ag7Ks9kkOKt8CCspgCx5lJ9ZIzhTekAgFMhdBNgXTYcz3QfE89UGIp9xu8Y13RFXw7i9OOSa9LKhJKRr5tmT3MgJg69qvR6fNLmPCNqlMKyLf/HktAbgMsNEhLWxTChQ8x3RTgstiQLf8amTjtIAIgdEK11KR/fMtYeFIi+NM3kT0oB59ijtKzO/RfIpSp0QfdkAUQRG+JpXKp0QosqXGUYyOVDE+a5sC02wuwq6MQf2ESDP50mBX6RFBTDkTYxuAAAAAElFTkSuQmCC);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%
    }

    .order-status-wrap .item .icon.comment {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADIUlEQVRYR+1XTVIaQRT+3vxY2YEVhi1TJayDJxBPIJ4guMtOPEHwBJmcQHMCyQnEE6hrsDJuGVK6doZ+qdfQhpqawRm0yo29gaK73/v669ff9yC886B3zo9XAYhqzQ4A9maTq00PshEAScwWnRHgS2Jm3AA4qkdj+Sw1SgOYea0eE86YcQugZynls00BGBUG7ZcFUQrA1Gu1CXzJoHs3jjvbj+GjHPeh6ldj1x2BUHGf4l3zexEqcgHMPu902aJjEEbEHNrx/HfiOkMAbSdO/HQSDY5wDfCp85QEc9c+YCIfjI7E8KaT0yxAmQAeqr6fbLl/hGYC+yCqmM3EOKpF4/OsYFOvdU7gAz1HVF3Wxy0RvjBjN+t6MgHo6rboEor3vdlkJIBi1x0QuJt1egNmydo5g4SpQBKmY6WBFwJgNsldr7tfmZe1q2veFECRokqv+QDwwcBGDEghRfUWi6h408lgk+Ize6J6cwDQd286znxxuUoYec0Rgyr1aLz7KgCLONV6NG4XVkJZaEzHiNEmIIw8r1PPXAZEVJIt54aZHtw43i9jMCsGdUnE285T0s7bv9YNTQGJ35cBocG7zgWIOnke8OwtL1H77P9AaLEa1KK7X+v2CO0AzojQXkd9LoBlgD0irkJhJO3W4i55CFBD2NDfFUZOktwKtcIUETcY1JNTA3zPTN3/ZoQ9ZpLe4SrtiM9XoBMTLkybZRCynHyuTmp/74bChgL6Yq96nnmxjBZhxL4tILDjeDi37Y6yrR9Z8cA4NED0Tu3/rnMtnY6l1ECS6ZewaEr6INoDc+BFkxNTYInjtJkQEPgTmL45SRJuP4bh4gXtBEzWMZivSHGwGk9Zlth6w4kT6ZxCDSCqNfsgDPK8XjcahK9pYRKtkP1eNJHuWA8jPMTqZy2666frZVmgISnuCbDCPaE5Fc3VoTlRGoBmzLYu8pKXEqKsxVodiRqm8VwFoBvTLfeamO9XGXnplRVmQAItu2KR1o6u8JUr0JpBGJq5lxIX1oF1gaJ6UxerN510iyZMryvFQEZB6X9Gpvo3AfEqAJskfFMG3gLAP89MDj8q9CCfAAAAAElFTkSuQmCC);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%
    }

    .order-status-wrap .item .text {
        width: 100%;
        font-size: .24rem;
        text-align: center
    }

    .menu-list-wrap {
        width: 100%;
        height: 7rem;
        background-color: #fff;
        margin-top: .3rem
    }

    .menu-list-wrap ul {
        width: 100%;
        height: .8rem;
        border-bottom: 1px solid #efefef;
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
        -webkit-align-items: center;
        padding-left: 10%;
        padding-right: 3%
    }

    .menu-list-wrap ul li:first-child {
        font-size: .32rem
    }

    .menu-list-wrap ul li:nth-child(2) {
        width: .4rem;
        height: .4rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACFElEQVR4Xu3b3TEEQRQF4LMREIIMCGFFgAgQgRCsDGSACBABIRCJlYE6VT1VXW3e9v6cWzP9ojyYrfPtvd3TM22DhY/NwvNjBVgrwEbgFcAZgCsAXzaXjLmKVQvsARwB4M/zSghWAPz2PysiWAGwXksiWAKURLAGKIfgATCHwNWBc4Tc8AIYEfj7LYBnNQFPgBII3gDyCBEARDgB8AbgtLWATDtEATD3cZsIpRAiASQRogHkEDIA5hB2AB4ylsgsgDkE3iNwcgwdmQASCNkA6QgKABMCW+Ci1X9YO6gATH3P4NeRCGoAzB6KoAgQiqAKMCJwH8Elkg9dTYcywIjAx+184myKoA7gjlABwBWhCgARuF+4bxOAWTtUAmD2GwBPDeEdwOWhM2I1gDsAj0sF4DfPCuD4BrC1WBGqVIBLeEpWAHALXwHANbw6QB+eMz773/QuUBmgD//STX6Hrnr//l5xDggLr1gBoeGVAPjWiAetuLZzuJZ93wcKLcDwH+2ITWh4hQpIDZ8NkB4+E2AMz9di3O6Gj4w5YAyfelYgGkAqfHQLyIWPBOARmelANT83teyj7wN4hJbrPCtAKnxEBUiH9waQD+8J0If/bU9vF3NUdgzPDY7sf5FY3weUCm/dAuXCWwKUDG8J8NPWeU540j0/7ras5gAeYGAV8F2d7IQ3t9W0Agjfxlp94ApgJVn1OouvgD9e14ZBa8OFNwAAAABJRU5ErkJggg==);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%
    }

    .menu-list-wrap .btn {
        width: 70%;
        height: .8rem;
        margin: 0 auto;
        background-color: #e51b19;
        border-radius: 5px;
        font-size: .32rem;
        color: #fff;
        text-align: center;
        line-height: .8rem;
        margin-top: .4rem
    }
</style>