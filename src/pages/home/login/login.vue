<template>
    <div class="page">
        <SubHeader title="会员登录"></SubHeader>
        <div class="main login-main">
            <div class="code-wrap" style="margin-top: 0px;">
                <input type="text" placeholder="手机号" v-model="cellphone">
            </div>
            <div class="password-wrap">
                <div class="password">
                    <input placeholder="密码" :type="checked ? 'text' : 'password'" v-model="password">
                </div>
                <div class="switch-wrap">
                    <van-switch v-model="checked" active-color="#eb1625"/>
                </div>
            </div>
            <div class="sure-btn" @click="doLogin()">登录</div>
            <div class="fastreg-wrap">
                <div>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACKElEQVRYR8WXv04VQRSHPxITQqcdHZDYK70FJPRARWGhPoH6BOATqE8glBAKEh4AAg+AiY0FRq1sjZ2JBvIlZ8ks7OzM3XvJPcnNzWZ353znd/7M7AxTtpkp+2cIwCLwGniawP8AToG9UQMaBeAh8B54CfwEjoDf4VCYdUCQTeBzLUgtgM5PgCVgI6K97UNlPgTIauaZO1y1AMqrAyNtos4FuRsQwpaeraqBlYi+NirVMgWC7JRSUaOACxl5WnSldXX8IlLW+2wNgPL7K0aTeGpUK65ffCDyaHFNDeAKeDcigOm6gHKN1SgwBMBsmAZTN7gG7HcLyf9xTAgV7ITJKWC+t2O0+qITboiZCpVwSr6K1myt0wXQVHDnC0MogDcxxh1OrWC6AIb0fQ2Xw8n9o9VNXQA1ff8MOADmw/M3YC02qb4R7ThX4RsbAqDzM+APcBgrPQdmY/K5U3aZket8bIBfwBzgzG9sAVCFL8DyfQP8A45j3099mTqrPgVL709MgRyAk88qv3eAS0DJHydF5/X3qI1WjhMJJqaAzr4CD4DziFjp/0Zt5LpgYgA6EMKe1vH/TE3cBpkoQLO4Ry4HTE72wUXooo7Pko0CoGJaa3PLjeInPf2cQm3FxX6B1M6wSz7Gybl3EjourWhPQW9LElTed38xctdunZRz27EfH58ivw6Y4vE6A9LM/ke574m+E5EvW7n+j2PWk2p2nilqjmTjOC++O3WAa7s7fiH4ZcEhAAAAAElFTkSuQmCC"
                         alt="忘记密码">
                    忘记密码
                </div>
                <div @click="$router.push('/reg')">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA+0lEQVRYR+2W4Q2CMBCFPzbQDdzAuIFOopuom8gEjqBuoBPoCG6geQkYQlpKK5WY3P0hBNr77sH1XsHIUYycn78BmADzSLVuwDO0JqTANSFxO6f2WPhAugBmwB0ogUOoEs/zDbAG/6fuAlgCJ2AP7BIBtG5rAKaAKQBMfYfSr9pwBZxdrWwApoApEPIDr8Y01GTTfd+op6imYVIbKlETICa51qq4ehwPAuCqXFZN4bNeWQFkWI4VgCqU9WpHVoB6cyX1uaasAJJf57uuUuORSwEZ0m9MqYxp0jRUQUPY8kulkLN9Q+dAc5Fkjg11h+vn/OwTAxCbvNf7BvAGJoBjIRa5KqsAAAAASUVORK5CYII="
                         alt="忘记密码">
                    快速注册
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SubHeader from "../../../components/subHeader/subHeader"
    import Vue from "vue"
    import {Switch, Toast} from "vant"
    import {mapState, mapMutations, mapActions} from "vuex"

    Vue.use(Switch)
    Vue.use(Toast)

    export default {
        name: "login",
        data() {
            return {
                cellphone: "",
                password: "",
                checked: false
            }
        },
        components: {
            SubHeader
        },
        methods: {
            ...mapActions({
                login: "user/login"
            }),
            doLogin() {
                if (this.cellphone.match(/^\s*$/)) {
                    Toast("请输入用户名");
                    return;
                }
                if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
                    Toast("您输入的手机号格式不正确");
                    return;
                }
                if (this.password.match(/^\s*$/)) {
                    Toast("请输入密码");
                    return;
                }
                this.login({
                    cellphone: this.cellphone, password: this.password, success: (res) => {
                        //console.log(res);
                        if (res.code === 200) {
                            if (this.$route.query.from === "reg") {
                                this.$router.go(-3);
                            } else {
                                this.$router.go(-1);
                            }
                        } else {
                            Toast(res.data);
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        height: 100vh;
        background-color: #fff
    }

    .main {
        width: 100%;
        padding-top: 1.4rem
    }

    .cellphone-wrap {
        width: 90%;
        height: .84rem;
        margin: 0 auto;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between
    }

    .cellphone-wrap .cellphone {
        width: 62%;
        height: 100%;
        border: 1px solid #efefef;
        border-radius: 2px
    }

    .cellphone-wrap .cellphone input, .code-wrap input, .password-wrap .password input {
        width: 92%;
        height: 100%;
        font-size: .28rem;
        padding-left: .2rem
    }

    .cellphone-wrap .code-btn {
        width: 35%;
        height: .82rem;
        background: #eaeaea;
        color: #717376;
        border: 1px solid #eaeaea;
        border-radius: 2px;
        font-size: .28rem;
        text-align: center;
        line-height: .82rem
    }

    .cellphone-wrap .code-btn.success {
        background: #fff;
        border: 1px solid #eb1625;
        color: #eb1625
    }

    .code-wrap, .password-wrap {
        width: 90%;
        height: .84rem;
        margin: 0 auto;
        border-radius: 2px;
        border: 1px solid #efefef;
        margin-top: .4rem
    }

    .password-wrap {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex
    }

    .password-wrap .password {
        width: 80%;
        height: 100%
    }

    .password-wrap .switch-wrap {
        width: 20%;
        margin-top: .1rem
    }

    .sure-btn {
        width: 85%;
        height: .8rem;
        margin: 0 auto;
        background: #eb1625;
        font-size: .36rem;
        color: #fff;
        line-height: .8rem;
        text-align: center;
        margin-top: .4rem;
        border-radius: 4px
    }

    .fastreg-wrap {
        width: 85%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        font-size: .24rem;
        margin: 0 auto;
        margin-top: .3rem
    }

    .fastreg-wrap img {
        width: .32rem;
        height: .32rem;
        vertical-align: middle
    }
</style>