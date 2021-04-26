<template>
    <div class="mask" v-if="isShow">
        <div class="confirm-wrap">
            <div class="message">{{msg}}</div>
            <div class="handle">
                <div class="btn" v-for="(item, index) in btns" :key="index" @click="handleBtn(index)">{{item.text}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-confirm",
        data() {
            return {
                msg: "",
                btns: [],
                isShow: true
            }
        },
        methods: {
            handleBtn(index) {
                if(this.btns[index]) {
                    this.btns[index].onPress();
                }
                this.isShow = false;
            }
        }
    }
</script>

<style scoped>
    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        index: 99;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .confirm-wrap {
        width: 400px;
        height: 200px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 3px;
    }
    .confirm-wrap .message {
        text-align: center;
        margin-top: 40px;
        font-size: 16px;
    }
    .confirm-wrap .handle {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 40px;
        margin-top: 50px;
        box-sizing: border-box;
    }
    .confirm-wrap .handle .btn {
        cursor: pointer;
    }
</style>