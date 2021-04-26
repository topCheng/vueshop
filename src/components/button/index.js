import Button from "./button.vue"
/*一个文件中只能有一个export default*/
export default {
    /*注册组件*/
    install(Vue) {
        Vue.component("my-button",Button);
    }
}