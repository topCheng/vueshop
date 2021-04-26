<template>
    <div class="banner-wrap" @mouseover="stop()" @mouseout="play()">
        <transition-group name="banner">
            <div class="slide" v-for="(item,index) in data" :key="index" v-show="item.checked">
                <img :src="item.image" alt="">
            </div>
        </transition-group>
        <div class="spot-wrap">
            <div :class="{spot: true, active:item.checked}" v-for="(item,index) in data" :key="index" @click="changeImage(index)"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-banner",
        props: {
            images: {
                type: Array,
                required: true
            }
        },
        data() {
          return {
              data: []
          }
        },
        created(){
            this.index = 0;
            this.play();
        },
        destroyed() {
            /*clearInterval(this.timer);*/
            this.stop();
        },
        methods: {
            changeImage(index) {
                this.index = index;
                if(this.data.length > 0) {
                    for(let i = 0; i < this.images.length; i++) {
                        if(this.data[i].checked) {
                            this.data[i].checked = false;
                            break;
                        }
                    }
                }
                this.data[index].checked = true;
                this.$set(this.data, index, this.data[index]);
                //console.log(this.data);
            },
            stop() {
                clearInterval(this.timer);
            },
            play() {
                this.timer = setInterval(()=> {
                    if(this.index < this.data.length - 1) {
                        this.index++;
                    } else {
                        this.index = 0;
                    }
                    this.changeImage(this.index);
                }, 3000);
            }
        },
        watch: {//监听images解决异步问题
            images: {
                handler(val) {
                    console.log(val);
                    this.data = [...val];//使用浅拷贝解决引用类型问题
                    //this.data = val.concat();//es5
                    if(this.data.length > 0) {
                        for(let i = 0; i < this.images.length; i++) {
                            if(i === 0) {
                                this.images[i].checked = true;
                            } else {
                                this.images[i].checked = false;
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .banner-wrap {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }
    .banner-wrap .slide {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .banner-wrap .slide img{
        width: 100%;
        height: 100%;
    }
    .banner-wrap .spot-wrap {
        position: absolute;
        z-index: 1;
        left: 50%;
        bottom: 8%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .banner-wrap .spot-wrap .spot {
        width: 30px;
        height: 8px;
        display: inline-block;
        background-color: rgba(0,0,0,0.6);
        margin: 0 3px;
    }
    .banner-wrap .spot-wrap .spot.active {
        background-color: rgba(255,255,255,0.6);
    }
    .banner-enter-active,
    .banner-leave-active {
        -webkit-transition: 1s;
        -moz-transition: 1s;
        -ms-transition: 1s;
        -o-transition: 1s;
        transition: 1s;
    }
    .banner-enter {
        opacity: 0;
    }
    .banner-enter-to {
        opacity: 1;
    }
    .banner-leave {
         opacity: 1;
    }
    .banner-leave-to {
        opacity: 0;
    }
</style>