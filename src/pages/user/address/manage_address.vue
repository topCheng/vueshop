<template>
    <div class="page">
        <SubHeader title="收货管理" right-text="保存"></SubHeader>
        <div class="main">
            <div class="list" v-for="(item,index) in address" @click="$router.push('/user/address/modify?aid='+item.aid)">
                <div class="name-wrap"><span>{{item.name}}</span><span>{{item.cellphone}}</span></div>
                <div class="address"><span v-if="item.isdefault==='1'">[默认]</span>{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
                <div class="right-arrow"></div>
            </div>
            <div style="width: 100%; height: 1.3rem;"></div>
        </div>
        <div class="add-btn" @click="$router.push('/user/address/add')">+ 添加新地址</div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import SubHeader from "../../../components/subHeader/subHeader"

    export default {
        name: "manage_address",
        components: {
            SubHeader
        },
        created() {
            this.$utils.safeUser(this);
            this.getAddress();
        },
        mounted() {
            document.title = this.$route.meta.title;
        },
        computed: {
            ...mapState({
                address: state => state.address.address
            })
        },
        methods: {
            ...mapActions({
                getAddress: "address/getAddress"
            })
        }
    }
</script>

<style scoped>
    .page {
        width: 100%;
        min-height: 100vh;
        background-color: #fff;
        overflow: hidden
    }

    .main {
        width: 100%;
        margin-top: 1.02rem
    }

    .list {
        width: 100%;
        height: 1.2rem;
        border-bottom: 1px solid #efefef;
        position: relative;
        z-index: 1
    }

    .list .name-wrap {
        width: auto;
        height: auto;
        position: absolute;
        left: 3%;
        top: .2rem;
        z-index: 1;
        font-size: .28rem
    }

    .list .name-wrap span {
        padding-right: .3rem
    }

    .list .address {
        width: auto;
        height: auto;
        font-size: .24rem;
        position: absolute;
        z-index: 1;
        left: 3%;
        top: .7rem
    }

    .list .address span {
        color: #fdb709
    }

    .list .right-arrow {
        width: .3rem;
        height: .3rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACFElEQVR4Xu3b3TEEQRQF4LMREIIMCGFFgAgQgRCsDGSACBABIRCJlYE6VT1VXW3e9v6cWzP9ojyYrfPtvd3TM22DhY/NwvNjBVgrwEbgFcAZgCsAXzaXjLmKVQvsARwB4M/zSghWAPz2PysiWAGwXksiWAKURLAGKIfgATCHwNWBc4Tc8AIYEfj7LYBnNQFPgBII3gDyCBEARDgB8AbgtLWATDtEATD3cZsIpRAiASQRogHkEDIA5hB2AB4ylsgsgDkE3iNwcgwdmQASCNkA6QgKABMCW+Ci1X9YO6gATH3P4NeRCGoAzB6KoAgQiqAKMCJwH8Elkg9dTYcywIjAx+184myKoA7gjlABwBWhCgARuF+4bxOAWTtUAmD2GwBPDeEdwOWhM2I1gDsAj0sF4DfPCuD4BrC1WBGqVIBLeEpWAHALXwHANbw6QB+eMz773/QuUBmgD//STX6Hrnr//l5xDggLr1gBoeGVAPjWiAetuLZzuJZ93wcKLcDwH+2ITWh4hQpIDZ8NkB4+E2AMz9di3O6Gj4w5YAyfelYgGkAqfHQLyIWPBOARmelANT83teyj7wN4hJbrPCtAKnxEBUiH9waQD+8J0If/bU9vF3NUdgzPDY7sf5FY3weUCm/dAuXCWwKUDG8J8NPWeU540j0/7ras5gAeYGAV8F2d7IQ3t9W0Agjfxlp94ApgJVn1OouvgD9e14ZBa8OFNwAAAABJRU5ErkJggg==);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        position: absolute;
        z-index: 1;
        right: 3%;
        top: .45rem
    }

    .add-btn {
        width: 80%;
        height: .8rem;
        background-color: #eb1625;
        position: fixed;
        z-index: 2;
        bottom: .4rem;
        left: 50%;
        border-radius: 4px;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        color: #fff;
        font-size: .28rem;
        text-align: center;
        line-height: .8rem
    }
</style>