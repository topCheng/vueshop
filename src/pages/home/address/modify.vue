<template>
    <div class="page">
        <SubHeader title="修改收货地址"></SubHeader>
        <div class="main">
            <ul>
                <li>收货人</li>
                <li><input type="text" placeholder="收货人姓名" v-model="name"></li>
            </ul>
            <ul>
                <li>联系方式</li>
                <li><input type="text" placeholder="联系人手机号" v-model="cellphone"></li>
            </ul>
            <ul>
                <li>所在地区</li>
                <li><input type="text" placeholder="请选择所在地区" readonly class="area" v-model="region"
                           @click="showArea=true"></li>
            </ul>
            <ul>
                <li>详细地址</li>
                <li><input type="text" placeholder="街道详细地址" v-model="address"></li>
            </ul>
            <ul>
                <li>设置为默认地址</li>
                <li><input type="checkbox" v-model="isDefault"></li>
            </ul>
            <button type="button" class="submit-save" @click="modify()">修改</button>
        </div>
        <van-popup v-model="showArea">
            <van-area title="请选择所在地区" :area-list="areaList" @cancel="showArea=false" @confirm="selectArea"/>
        </van-popup>
    </div>
</template>

<script>
    import Vue from "vue"
    import {Toast, Area, Popup} from "vant"
    import {mapActions} from "vuex"
    import SubHeader from "../../../components/subHeader/subHeader"
    import areaList from "../../../assets/data/area"

    Vue.use(Toast)
    Vue.use(Area)
    Vue.use(Popup)

    export default {
        name: "modifyAddress",
        data() {
            return {
                name: "",
                cellphone: "",
                region: "",
                address: "",
                isDefault: false,
                areaList: areaList,
                showArea: false,
                province: "",
                city: "",
                area: ""
            }
        },
        created() {
            this.$utils.safeUser(this);
            this.isSubmit = true;
            this.aid = this.$route.query.aid ? this.$route.query.aid : ""
            this.getAddressInfo({
                aid: this.aid, success: (res) => {
                    //console.log(res);
                    if (res.code === 200) {
                        this.name = res.data.name;
                        this.cellphone = res.data.cellphone;
                        this.region = res.data.province + " " + res.data.city + " " + res.data.area;
                        this.province = res.data.province;
                        this.city = res.data.city;
                        this.area = res.data.area;
                        this.address = res.data.address;
                        this.isDefault = res.data.isdefault === "1" ? true : false
                    }
                }
            })
        },
        components: {
            SubHeader
        },
        mounted() {
            document.title = this.$route.meta.title;

        },
        methods: {
            ...mapActions({
                getAddressInfo: "address/getAddressInfo",
                modifyAddress: "address/modifyAddress"
            }),
            modify() {
                if (this.name.match(/^\s*$/)) {
                    Toast("请输入收货人姓名");
                    return;
                }
                if (this.cellphone.match(/^\s*$/)) {
                    Toast("请输入联系人手机号");
                    return;
                }
                if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
                    Toast("您输入的联系人手机号格式不正确");
                    return;
                }
                if (this.region.match(/^\s*$/)) {
                    Toast("请选择所在地区");
                    return;
                }
                if (this.address.match(/^\s*$/)) {
                    Toast("请输入街道详细地址");
                    return;
                }
                if (this.isSubmit) {
                    this.isSubmit = false;
                    this.modifyAddress({
                        aid: this.aid,
                        name: this.name,
                        cellphone: this.cellphone,
                        province: this.province,
                        city: this.city,
                        area: this.area,
                        address: this.address,
                        isdefault: this.isDefault ? "1" : "0",
                        success: (res) => {
                            //console.log(res);
                            if (res.code === 200) {
                                Toast({
                                    duration: 2000,
                                    message: res.data,
                                    onClose: () => {
                                        this.$router.go(-1);
                                    }
                                });
                            }
                        }
                    });
                }
            },
            selectArea(data) {
                this.showArea = false;
                //console.log(data);
                if (data.length > 0) {
                    let tempData = [];
                    for (let i = 0; i < data.length; i++) {
                        tempData.push(data[i].name);
                    }
                    //console.log(tempData)
                    this.region = tempData.join(" ");
                    this.province = tempData[0];
                    this.city = tempData[1];
                    this.area = tempData[2];
                }
            }
        }
    }
</script>

<style scoped>
    input[type="checkbox"] {
        background-color: initial;
        cursor: default;
        -webkit-appearance: checkbox;
        box-sizing: border-box;
        margin: 3px 3px 3px 4px;
        padding: initial;
        border: initial;
    }

    .page {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-color: #fff
    }

    .main {
        width: 100%;
        margin-top: 1rem
    }

    .main ul {
        width: 100%;
        height: 1.02rem;
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

    .main ul li {
        font-size: .32rem;
        margin-left: .3rem
    }

    .main ul li:nth-child(2) {
        width: 62%;
        height: 100%
    }

    .main ul li input[type=text] {
        width: 100%;
        height: 100%;
        font-size: .32rem
    }

    .main ul li .area {
        font-size: .28rem !important
    }

    .main ul li input[type=checkbox] {
        width: .4rem;
        height: .4rem;
        margin-top: .3rem
    }

    .main .submit-save {
        width: 85%;
        height: .8rem;
        background-color: #fcb40a;
        border-radius: 4px;
        margin: 0 auto;
        display: block;
        border: 0 none;
        outline: none;
        font-size: .32rem;
        color: #fff;
        margin-top: .4rem
    }
</style>