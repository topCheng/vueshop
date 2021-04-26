<template>
    <div class="page">
        <SubHeader title="添加收货地址" :isSave="true"></SubHeader>
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
            <button type="button" class="submit-save" @click="save()">保存</button>
        </div>
        <van-popup v-model="showArea">
            <van-area title="请选择所在地区" :area-list="areaList" @cancel="showArea=false" @confirm="selectArea"/>
        </van-popup>
    </div>
</template>

<script>
    import Vue from "vue"
    import SubHeader from "../../../components/subHeader/subHeader"
    import {Toast, Area, Popup} from "vant"
    import areaData from "../../../assets/data/area"
    import {mapActions} from "vuex"

    Vue.use(Toast)
    Vue.use(Area)
    Vue.use(Popup)
    export default {
        name: "addAddress",
        data() {
            return {
                name: "",
                cellphone: "",
                region: "",
                address: "",
                isDefault: false,
                areaList: areaData,
                showArea: false,
                province: "",
                city: "",
                area: ""
            }
        },
        created() {
            this.$utils.safeUser(this);
            this.isSubmit = true;
        },
        components: {
            SubHeader
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        methods: {
            ...mapActions({
                addAddress: "address/addAddress"
            }),
            save() {
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
                    Toast("请输入详细地址");
                    return;
                }
                if(this.isSubmit) {
                    this.isSubmit =false;//防止订单重复提交
                    this.addAddress({
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
                                    message: "添加成功",
                                    onClose: () => {
                                        this.$router.go(-1);
                                    }
                                })
                            }
                        }
                    });
                }
            },
            selectArea(data) {
                this.showArea = false;
                let tempArea = [];
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        tempArea.push(data[i].name);
                    }
                    //console.log(tempArea)
                    this.province = tempArea[0];
                    this.city = tempArea[1];
                    this.area = tempArea[2];
                    this.region = tempArea.join(" ");
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