<template>
    <div class="page">
        <SubHeader title="个人资料" right-text="保存" @submit="submit()"></SubHeader>
        <div class="main">
            <ul class="head">
                <li>头像</li>
                <li>
                    <img :src="showHead" alt="">
                    <input type="file" ref="headFile" @change="uploadHead">
                </li>
            </ul>
            <ul class="list">
                <li>昵称</li>
                <li><input type="text" placeholder="请设置昵称" v-model="nickname"></li>
                <li class="arrow"></li>
            </ul>
            <ul class="list">
                <li>性别</li>
                <li><input type="text" placeholder="请选择性别" :value="showGender" readonly="readonly" @click="show=true">
                </li>
                <li class="arrow"></li>
            </ul>
        </div>
        <van-action-sheet
                v-model="show"
                :actions="actions"
                cancel-text="取消"
                title="请选择性别"
                @select="onSelect"
        />
    </div>
</template>

<script>
    import SubHeader from "../../../components/subHeader/subHeader"
    import Vue from 'vue';
    import {ActionSheet, Toast} from 'vant';
    import {mapActions} from "vuex"

    Vue.use(ActionSheet);
    Vue.use(Toast)

    export default {
        name: "profile",
        data() {
            return {
                nickname: "",
                show: false,
                actions: [{name: '男'}, {name: '女'}],
                showGender: "",
                gender: "",
                showHead: require("../../../assets/images/user/my/default-head.png"),
                head: ""
            }
        },
        components: {
            SubHeader
        },
        created() {
            this.isSubmit = true;
            this.$utils.safeUser(this);
            this.getUserInfo({
                success: (res) => {
                    //console.log(res);
                    this.nickname = res.data.nickname;
                    this.gender = res.data.gender;
                    this.showGender = this.gender === "1" ? "男" : this.gender === "2" ? "女" : "";
                    this.showHead = res.data.head ? res.data.head : require("../../../assets/images/user/my/default-head.png");
                }
            });
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        methods: {
            ...mapActions({
                asyncuploadHead: "user/uploadHead",
                updateUserInfo: "user/updateUserInfo",
                getUserInfo: "user/getUserInfo"
            }),
            submit() {
                if (this.nickname.match(/^\s*$/)) {
                    Toast("请设置昵称");
                    return;
                }
                if (this.showGender.match(/^\s*$/)) {
                    Toast("请选择性别");
                    return;
                }
                if (this.isSubmit) {
                    this.isSubmit = false;
                    this.updateUserInfo({
                        nickname: this.nickname, gender: this.gender, head: this.head, success: (res) => {
                            if (res.code === 200) {
                                Toast({
                                    duration: 2000,
                                    message: res.data,
                                    onClose: () => {
                                        this.$router.go(-1);
                                    }
                                });
                            } else {
                                Toast(res.data);
                            }
                        }
                    });
                }
            },
            uploadHead(e) {
                //console.log(e.target.files[0]);
                if (e.target.files[0]) {
                    this.asyncuploadHead({
                        headfile: e.target.files[0], success: (res) => {
                            if (res.code === 200) {
                                this.showHead = "http://vueshop.glbuys.com/userfiles/head/" + res.data.msbox;
                                this.head = res.data.msbox;
                            }
                        }
                    })
                }
            },
            onSelect(val) {
                //console.log(val);
                this.showGender = val.name;
                this.show = false;
                this.gender = this.showGender == "男" ? "1" : this.showGender == "女" ? "2" : "";
                //console.log(this.gender);
            }
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        height: 100vh;
        background-color: #fff;
        overflow: hidden
    }

    .main {
        width: 100%;
        margin-top: 1.02rem
    }

    .main ul.head {
        width: 100%;
        height: 1.2rem;
        border-bottom: 1px solid #efefef;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between
    }

    .main ul.head li:first-child {
        font-size: .28rem;
        margin-left: 5%
    }

    .main ul.head li:nth-child(2) {
        width: 1rem;
        height: 1rem;
        margin-right: 10%;
        position: relative;
        z-index: 1
    }

    .main ul.head li:nth-child(2) img {
        width: 100%;
        height: 100%;
        border-radius: 100%
    }

    .main ul.head li:nth-child(2) input {
        width: 100%;
        height: 82%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        opacity: 0
    }

    .main ul.list {
        width: 100%;
        height: .8rem;
        border-bottom: 1px solid #efefef;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        font-size: .28rem
    }

    .main ul.list li:first-child {
        margin-left: 5%
    }

    .main ul.list li:nth-child(2) {
        width: 50%;
        height: 100%;
        margin-left: 20%
    }

    .main ul.list li:nth-child(2) input {
        width: 100%;
        height: 82%;
        text-align: right;
        font-size: .28rem
    }

    .main ul.list li.arrow {
        width: .4rem;
        height: .4rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACFElEQVR4Xu3b3TEEQRQF4LMREIIMCGFFgAgQgRCsDGSACBABIRCJlYE6VT1VXW3e9v6cWzP9ojyYrfPtvd3TM22DhY/NwvNjBVgrwEbgFcAZgCsAXzaXjLmKVQvsARwB4M/zSghWAPz2PysiWAGwXksiWAKURLAGKIfgATCHwNWBc4Tc8AIYEfj7LYBnNQFPgBII3gDyCBEARDgB8AbgtLWATDtEATD3cZsIpRAiASQRogHkEDIA5hB2AB4ylsgsgDkE3iNwcgwdmQASCNkA6QgKABMCW+Ci1X9YO6gATH3P4NeRCGoAzB6KoAgQiqAKMCJwH8Elkg9dTYcywIjAx+184myKoA7gjlABwBWhCgARuF+4bxOAWTtUAmD2GwBPDeEdwOWhM2I1gDsAj0sF4DfPCuD4BrC1WBGqVIBLeEpWAHALXwHANbw6QB+eMz773/QuUBmgD//STX6Hrnr//l5xDggLr1gBoeGVAPjWiAetuLZzuJZ93wcKLcDwH+2ITWh4hQpIDZ8NkB4+E2AMz9di3O6Gj4w5YAyfelYgGkAqfHQLyIWPBOARmelANT83teyj7wN4hJbrPCtAKnxEBUiH9waQD+8J0If/bU9vF3NUdgzPDY7sf5FY3weUCm/dAuXCWwKUDG8J8NPWeU540j0/7ras5gAeYGAV8F2d7IQ3t9W0Agjfxlp94ApgJVn1OouvgD9e14ZBa8OFNwAAAABJRU5ErkJggg==);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-right: 3%
    }
</style>