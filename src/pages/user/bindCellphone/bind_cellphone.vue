<template>
    <div class="page">
        <SubHeader title="绑定手机"></SubHeader>
        <div class="main">
            <div class="tip">
                <div class="icon"></div>
                <div class="text">新手机号验证后，即可绑定成功！</div>
            </div>
            <div class="input-wrap" style="margin-top: 0.5rem;">
                <input type="tel" placeholder="绑定手机号" class="cellphone" @input="checkedCellphone()" v-model="cellphone">
            </div>
            <div class="input-wrap" style="margin-top: 0.2rem;">
                <input type="text" placeholder="请输入短信验证码" class="code" v-model="msgCode">
                <div :class="{'code-btn':true, success: isSendMsgCode}" @click="getMsgCode()">{{msgCodeText}}</div>
            </div>
            <div class="save-btn" @click="nextStep()">下一步</div>
        </div>
    </div>
</template>

<script>
    import SubHeader from "../../../components/subHeader/subHeader"
    import Vue from "vue"
    import {Toast} from "vant"
    import {mapActions} from "vuex"

    Vue.use(Toast)

    export default {
        name: "bind_cellphone",
        data() {
            return {
                cellphone: "",
                msgCode: "",
                isSendMsgCode: false,
                msgCodeText: "获取短信验证码"
            }
        },
        components: {
            SubHeader
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        created() {
            this.$utils.safeUser(this);
            this.timer = null;
            this.isSubmit = true;
        },
        methods: {
            ...mapActions({
                isReg: "user/isReg",
                updateCellphone: "user/updateCellphone"
            }),
            async nextStep() {//下一步
                if (this.cellphone.match(/^\s*$/)) {
                    Toast("请输入手机号码");
                    return;
                }
                if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
                    Toast("您输入的手机号码格式不正确");
                    return;
                }
                let isRegData = await this.isReg({username: this.cellphone});
                //console.log(isRegData);//{"status":1,"code":200,"data":{"isreg":"1","uid":"941033670"}}
                if (isRegData.data.isreg === "1") {
                    Toast("此手机号已注册");
                    return;
                }
                if (this.msgCode.match(/^\s*$/)) {
                    Toast("请输入短信验证码");
                    return;
                }
                if (this.isSubmit) {
                    this.isSubmit = false;
                    this.updateCellphone({
                        cellphone: this.cellphone, vcode: this.msgCode, success: (res) => {
                            if (res.code === 200) {
                                this.$router.go(-1);
                            }else {
                                Toast(res.data);
                            }
                        }
                    })
                }
            },
            async getMsgCode() {//获取短信验证码
                if (this.isSendMsgCode) {
                    if (this.cellphone.match(/^\s*$/)) {
                        Toast("请输入手机号码");
                        return;
                    }
                    if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
                        Toast("您输入的手机号码格式不正确");
                        return;
                    }
                    let isRegData = await this.isReg({username: this.cellphone});
                    //console.log(isRegData);
                    if (isRegData.code === 200) {
                        if (isRegData.data.isreg === "1") {
                            Toast("此手机号已注册");
                            return;
                        }
                    }
                    let time = 10;
                    this.isSendMsgCode = false;
                    this.msgCodeText = "重新获取" + time + "s";
                    this.timer = setInterval(() => {
                        time--;
                        if (time > 0) {
                            this.msgCodeText = "重新获取" + time + "s";
                        } else {
                            clearInterval(this.timer);
                            this.msgCodeText = "获取短信验证码";
                            this.isSendMsgCode = true;
                        }
                    }, 1000);
                }
            },
            checkedCellphone() {//检测手机号
                let isChecked = true;
                if (this.cellphone.match(/^\s*$/)) {
                    isChecked = false;
                    return;
                }
                if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
                    isChecked = false;
                    return;
                }
                if (isChecked) {
                    this.isSendMsgCode = true;
                } else {
                    this.isSendMsgCode = false;
                }
            }
        },
        destroyed() {
            clearInterval(this.timer);
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

    .main .tip {
        width: 100%;
        height: 1rem;
        background-color: #f3f5c4;
        color: #ac7700;
        font-size: .28rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center
    }

    .main .tip .icon {
        width: .4rem;
        height: .4rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMjY0MEFDMUU0MEYxMUU0QjQ0OUI5NUUwQTdGNkZCQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMjY0MEFDMkU0MEYxMUU0QjQ0OUI5NUUwQTdGNkZCQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyNjQwQUJGRTQwRjExRTRCNDQ5Qjk1RTBBN0Y2RkJDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYyNjQwQUMwRTQwRjExRTRCNDQ5Qjk1RTBBN0Y2RkJDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VVOnWwAAAwhJREFUeNq0l1lIVVEUhs85ZYhS3dQQrrfIoqJeIqwoGiAqoXrJim4UGTRoSgP10pNC0HMDDZQ0kQ+WNGBhUNKAET6UQUVENGkDBtlNaS4b/gX/gd3t3LP3vnAXfOwzrrXP3muv/R/3zHbHxLJAKZkMRoII7/WA5+AOuAIug586h/0198X5ZrARDFWufwUJHg8B08gm8B4cALvZqUDzQoIuB4/ADnagCZSDYpADoiSH18r5zEBQCx7Th3HgfuAgaACF4BgYAxaBetCR9PwfXqvnM6PBUVBAH3VBI+sFBD0FqsBbMBesDQgWZi/BOjAbvAHrQSN9pwy8BywFT8FUcM1J31o57zJdZWB/qsBxJlEXe9upcRxngl0PeeYVV4J8+QawMjmwJM9ezpfcfG3wRfuY0WM1z4mvFeA3Mz1PDbyFiXRc8wWq3eXSqTAc9iNcklvlgosCksWhiDAjO53MWAw8A59kGXqcA+nJpQwG9Ye8iUM93w8sdtbJvJ1jWyqBS3hy09LJYHCYxcbUbrEt8ViVvlkWCVmX95lYEYv3ZHl9AaOklA1idppaHZfGcKVS2Vi3JJoEdi1flK/MB5U8f5jGXLsy1L3MNJsOFCvHDyyDSqcTEvgJyFaGzsQmsu1jLTa1IpArwsFjBRKbaeFgElvZc79bvOfHaJfALTxZbOFgPNt7lsNcxrbFo06SrF4Ihhk6GMf2BXMjbvBOlELhA2j2uIZFIw2gZDERfvnKl5tWvBrGOCTT4+9Osl29A2vALI2DbOV4Djt9WvPODCoRGdld6rbYw63Ro06KhTj5yKp1m528arArNVD6bGMB+UeB+MIsynkPm+8JYIpBchVRZ0vwE+BkKs1VDc4zedosl1iyTacPyYOLSqULDPwLLKNakN7eYDLELAJGuWO1ctRE6i4BP3S6uo+JsIpirpLKoZECPZZiSEUGX+DvTBXfXU2p+98vjav5d8qjRqr2RRrtM1eBQ/WSq9zrVX5hutP9d0pw/e0EC8A8lssRxN/mpF63MymbTcroXwEGAABGqGt4MhyUAAAAAElFTkSuQmCC);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-left: .4rem;
        margin-right: .2rem
    }

    .main .tip .text {
        width: auto;
        height: auto
    }

    .main .input-wrap {
        width: 93%;
        height: .8rem;
        border: 1px solid #c5cbcf;
        border-radius: 4px;
        margin: 0 auto;
        overflow: hidden
    }

    .main .input-wrap .cellphone {
        width: 93%;
        height: 73%;
        font-size: .28rem;
        margin-left: .2rem;
        margin-top: .05rem
    }

    .main .input-wrap .code {
        width: 69%;
        height: 73%;
        font-size: .28rem;
        margin-left: .2rem;
        margin-top: .05rem;
        float: left
    }

    .main .input-wrap .code-btn {
        width: 27%;
        height: 100%;
        border-left: 1px solid #efefef;
        float: left;
        font-size: .28rem;
        color: #717376;
        text-align: center;
        line-height: .8rem;
        background: #EAEAEA;
    }

    .main .input-wrap .code-btn.success {
        color: #eb1625;
        background: #FFFFFF;
    }

    .main .save-btn {
        width: 93%;
        height: .8rem;
        background-color: #e42321;
        font-size: .28rem;
        color: #fff;
        text-align: center;
        line-height: .8rem;
        margin: 0 auto;
        border-radius: 4px;
        margin-top: .2rem
    }
</style>